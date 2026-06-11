"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

/* ─── Quick-reply suggestion chips ──────────────────────────────────────── */

const SUGGESTIONS = [
  "What does ASREP Africa do?",
  "How can I donate?",
  "Tell me about your programmes",
  "How do I contact you?",
  "How can I volunteer?",
];

/* ─── Markdown-lite renderer (bold, italic, bullet lists) ───────────────── */

function renderInline(text: string): React.ReactNode[] {
  // **bold** first, then *italic* within plain segments — order matters
  return text.split(/\*\*(.*?)\*\*/g).flatMap((part, j) => {
    if (j % 2 === 1) return [<strong key={`b${j}`}>{part}</strong>];
    return part.split(/\*(.*?)\*/g).map((s, k) =>
      k % 2 === 1 ? <em key={`i${j}-${k}`}>{s}</em> : s
    );
  });
}

function renderMarkdown(text: string): React.ReactNode[] {
  return text.split("\n").map((line, i) => {
    // Bullet list items
    if (line.startsWith("•") || line.startsWith("-")) {
      return (
        <li key={i} className="ml-3 list-none flex gap-1.5">
          <span className="text-forest mt-0.5">•</span>
          <span>{renderInline(line.replace(/^[•\-]\s*/, ""))}</span>
        </li>
      );
    }

    // Numbered items (e.g. "1. Climate…")
    if (/^\d+\./.test(line)) {
      const numPrefix = line.match(/^\d+\.\s*/)?.[0] ?? "";
      return (
        <li key={i} className="ml-1 list-none flex gap-1.5">
          <span className="text-forest font-semibold shrink-0">{numPrefix.trimEnd()}</span>
          <span>{renderInline(line.slice(numPrefix.length))}</span>
        </li>
      );
    }

    // Empty lines → spacer
    if (!line.trim()) return <div key={i} className="h-1.5" />;

    return <p key={i}>{renderInline(line)}</p>;
  });
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Jambo! I'm **Amara**, ASREP Africa's virtual assistant. 🌿\n\nI'm here to answer questions about our programmes, team, impact, and how to get involved. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* ── Scroll to bottom on new messages ──────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Focus input when chat opens ───────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasUnread(false);
    }
  }, [isOpen]);

  /* ── Send message ───────────────────────────────────────────────────────── */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      const assistantMsgId = `a-${Date.now()}`;
      const assistantMsg: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsLoading(true);

      // Show unread badge if chat is closed
      if (!isOpen) setHasUnread(true);

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortRef.current.signal,
        });

        if (res.status === 429) throw new Error("rate-limited");
        if (!res.ok || !res.body) throw new Error("Chat unavailable");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? { ...m, content: accumulated, streaming: true }
                : m
            )
          );
        }

        // Mark streaming complete
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, streaming: false } : m
          )
        );
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const isRateLimited = (err as Error).message === "rate-limited";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: isRateLimited
                    ? "I'm getting a lot of messages right now — please try again in a moment!"
                    : "I'm sorry, I couldn't process that. Please try again or email us at asrepafrica@gmail.com.",
                  streaming: false,
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isOpen, messages]
  );

  /* ── Handle Enter key ───────────────────────────────────────────────────── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  /* ── Auto-grow textarea ─────────────────────────────────────────────────── */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Chat Panel ──────────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-label="ASREP Africa chat assistant"
        aria-modal="false"
        className={`fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-96
          bg-white rounded-2xl shadow-2xl border border-charcoal/10 flex flex-col
          transition-all duration-300 ease-in-out origin-bottom-right
          ${isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
          }`}
        style={{ maxHeight: "min(600px, calc(100vh - 8rem))" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-forest rounded-t-2xl shrink-0">
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/20 shrink-0 flex items-center justify-center">
            <Image
              src="/logos/asrep-logo.png"
              alt="ASREP Africa"
              width={36}
              height={36}
              className="object-contain bg-white rounded-full p-0.5"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">Amara</p>
            <p className="text-white/60 text-[10px] leading-tight">ASREP Africa Virtual Assistant</p>
          </div>
          {/* Online indicator */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
            <span className="text-white/60 text-[10px]">Online</span>
          </div>
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="ml-2 p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg
              transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            aria-label="Close chat"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-forest shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
              )}

              {/* Bubble */}
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                  ${msg.role === "user"
                    ? "bg-forest text-white rounded-br-sm"
                    : "bg-sand/40 text-charcoal rounded-bl-sm border border-charcoal/8"
                  }`}
              >
                <div className="space-y-0.5">
                  {renderMarkdown(msg.content)}
                </div>
                {/* Typing cursor */}
                {msg.streaming && (
                  <span className="inline-block w-1.5 h-4 bg-forest/60 ml-0.5 animate-pulse align-text-bottom" aria-hidden="true" />
                )}
              </div>
            </div>
          ))}

          {/* Thinking indicator */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-forest shrink-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div className="bg-sand/40 border border-charcoal/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-forest/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-forest/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-forest/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions — shown only with first welcome message */}
        {messages.length === 1 && (
          <div className="px-4 pb-3 shrink-0">
            <p className="text-muted text-[10px] uppercase tracking-wider mb-2 font-semibold">Quick questions</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="px-3 py-1.5 bg-forest/8 hover:bg-forest/15 text-forest text-xs font-medium
                    rounded-full border border-forest/20 transition-colors text-left leading-snug"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="px-4 pb-4 pt-2 border-t border-charcoal/8 shrink-0">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about ASREP Africa…"
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none px-3.5 py-2.5 text-sm bg-sand/30 border border-charcoal/15
                rounded-xl text-charcoal placeholder-charcoal/40 leading-relaxed
                focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest/40
                transition disabled:opacity-60 overflow-hidden"
              style={{ minHeight: "42px" }}
              aria-label="Chat message input"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-forest hover:bg-sage disabled:opacity-40
                flex items-center justify-center transition-colors shrink-0
                focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
              aria-label="Send message"
            >
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-charcoal/30 mt-2 text-center">
            Powered by ASREP Africa local knowledge base
          </p>
        </div>
      </div>

      {/* ── Floating Trigger Button ─────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`fixed bottom-6 right-4 sm:right-6 z-[60] w-14 h-14 rounded-full shadow-2xl
          flex items-center justify-center transition-all duration-300
          focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none
          ${isOpen
            ? "bg-charcoal/80 hover:bg-charcoal rotate-0"
            : "bg-forest hover:bg-sage hover:scale-110 hover:-translate-y-0.5"
          }`}
        aria-label={isOpen ? "Close chat" : "Chat with Amara, ASREP Africa's virtual assistant"}
        aria-expanded={isOpen}
      >
        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cta
            flex items-center justify-center text-[9px] text-white font-bold" aria-hidden="true">
            1
          </span>
        )}

        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          /* Chat bubble icon */
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {/* Tooltip on hover — desktop only */}
      {!isOpen && (
        <div
          className="fixed bottom-7 right-20 sm:right-24 z-[59] hidden sm:block pointer-events-none"
          aria-hidden="true"
        >
          <div className="bg-forest text-white text-xs font-medium px-3 py-1.5 rounded-lg
            shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100
            translate-x-2 transition-all duration-200">
            Chat with Amara
          </div>
        </div>
      )}
    </>
  );
}
