import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * ASREP Africa — Local AI Chat Assistant
 *
 * Fully self-contained: no external API, no API keys.
 * Uses keyword scoring against a curated ASREP knowledge base.
 * Returns the best-matching response to any visitor question.
 */

/* ─── Knowledge Base ─────────────────────────────────────────────────────── */

type KnowledgeEntry = {
  keywords: string[];
  response: string;
  /** Higher weight = preferred when multiple entries tie */
  weight?: number;
};

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  /* ── Greetings ──────────────────────────────────────────────────────────── */
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "greetings", "howdy"],
    response:
      "Hello! I'm Amara, ASREP Africa's virtual assistant 👋 I'm here to help you learn about our work in Kenya's ASALs. Ask me about our programmes, team, impact, or how to get involved!",
    weight: 2,
  },

  /* ── What is ASREP ──────────────────────────────────────────────────────── */
  {
    keywords: ["what is asrep", "who is asrep", "about asrep", "tell me about", "what do you do", "organisation", "organization", "ngo", "charity"],
    response:
      "ASREP Africa stands for the ASAL Research & Resilience Programme. We are a locally-led NGO founded in 2023 and headquartered in Isiolo County, Kenya.\n\nOur mission is to build resilient communities across Kenya's arid and semi-arid lands (ASALs) — which cover about 84% of the country — through evidence-based, climate-responsive programmes.\n\nOur tagline: *\"Rooted in the ASALs. Driven by Evidence. United for Peace and Resilience.\"*",
    weight: 3,
  },

  /* ── Programmes overview ────────────────────────────────────────────────── */
  {
    keywords: ["programmes", "programs", "what you do", "work", "activities", "areas", "thematic", "focus"],
    response:
      "We run six integrated programmes across Isiolo County and Kenya's ASALs:\n\n1. 🌿 **Climate Resilience & NbS** — Waso Eco-Champions, 10,000 trees planted\n2. 🕊️ **Peacebuilding & Social Cohesion** — Isiolo Peace Actors Forum\n3. 📚 **Research & Knowledge** — ASAL IK Vault Series\n4. 🏛️ **Civic Governance & Youth** — KSG Under the Tree Series\n5. 🦁 **Biodiversity Restoration** — SDZWA-K partnership\n6. 💼 **Livelihoods & Empowerment** — Eco-entrepreneurship webinars\n\nWould you like to know more about any specific programme?",
    weight: 2,
  },

  /* ── Climate Resilience / Eco-Champions ────────────────────────────────── */
  {
    keywords: ["climate", "trees", "eco-champions", "eco champions", "waso", "nature", "nbs", "nature-based", "reforestation", "planting", "forest", "environment"],
    response:
      "Our Climate Resilience & Nature-Based Solutions programme is our flagship work. Through the **Waso Eco-Champions Programme**, we have:\n\n• Planted **10,000 indigenous trees** across Isiolo County\n• Mobilised **2,000 community eco-champions** across 10 wards\n• Partnered with Kenya Forest Service (KFS) and Kenya Wildlife Service (KWS)\n\nThe programme restores degraded ASAL landscapes while building community livelihoods through nature-based solutions.",
  },

  /* ── Peacebuilding ──────────────────────────────────────────────────────── */
  {
    keywords: ["peace", "peacebuilding", "conflict", "dialogue", "social cohesion", "community", "forum", "isiolo peace"],
    response:
      "Our **Peacebuilding & Social Cohesion** programme addresses resource conflicts between pastoral and farming communities.\n\nThrough the **Isiolo Peace Actors Forum**, we have:\n• Engaged **500+ community members** in structured peace dialogues\n• Ensured **60% women & youth** participation\n• Partnered with Interpeace, PROCMURA, and Alliance for Peacebuilding\n\nWe believe durable peace in the ASALs must be community-led and culturally grounded.",
  },

  /* ── Research & Indigenous Knowledge ───────────────────────────────────── */
  {
    keywords: ["research", "knowledge", "indigenous", "ik vault", "publication", "cows women land", "borana", "oromo", "academic", "evidence"],
    response:
      "Our **Research & Knowledge Management** programme documents indigenous ASAL knowledge and generates evidence for policy.\n\nOur debut publication — **\"Cows, Women & Land\"** (ASAL IK Vault Series) — documents Borana Oromo ecological and cultural knowledge from Isiolo County. It has entered national policy discourse and been celebrated in global media including The Guardian and Biographic Magazine.\n\nThis work ensures ASAL communities' wisdom shapes the decisions that affect them.",
  },

  /* ── Civic Governance ───────────────────────────────────────────────────── */
  {
    keywords: ["governance", "civic", "youth", "ksg", "under the tree", "counties", "government", "devolution", "citizenship"],
    response:
      "Our **Civic Governance & Youth** programme deepens citizen engagement through the **KSG \"Under the Tree\" Series** — a landmark partnership with the Kenya School of Government (KSG).\n\nPiloted in Isiolo, this unique community-based civic education model is now scaling to all **47 Kenyan counties**. It takes formal governance education out of classrooms and into the heart of communities.",
  },

  /* ── Biodiversity ───────────────────────────────────────────────────────── */
  {
    keywords: ["biodiversity", "wildlife", "conservation", "sdzwa", "san diego zoo", "species", "ecosystem", "animals"],
    response:
      "Our **Biodiversity Restoration** programme protects Kenya's iconic ASAL wildlife and ecosystems.\n\nIn partnership with **San Diego Zoo Wildlife Alliance Kenya (SDZWA-K)**, ASREP Africa represented Isiolo County in the national biodiversity strategy validation. We work to ensure ASAL community voices shape Kenya's conservation agenda.",
  },

  /* ── Livelihoods ────────────────────────────────────────────────────────── */
  {
    keywords: ["livelihoods", "economic", "income", "jobs", "entrepreneurship", "business", "empowerment", "webinar", "green"],
    response:
      "Our **Livelihoods & Economic Empowerment** programme creates sustainable income pathways through eco-entrepreneurship, green skills, and market linkages.\n\nOur inaugural **Eco-Entrepreneurship Webinar** engaged 40+ participants exploring green income opportunities in ASAL communities. This programme links environmental conservation with economic opportunity.",
  },

  /* ── Impact numbers ─────────────────────────────────────────────────────── */
  {
    keywords: ["impact", "numbers", "statistics", "results", "data", "achievements", "how many", "reach"],
    response:
      "Here's ASREP Africa's impact at a glance (2023–2026):\n\n• 🌍 **10 wards** covered across Isiolo County\n• 👥 **2,000+** people reached\n• 🕊️ **500+** peace actors engaged\n• 📋 **23 policies** developed\n• 👩 **60%** women & youth in all programmes\n\nThese numbers represent real communities whose lives are more resilient, more peaceful, and more connected to opportunity.",
  },

  /* ── Leadership / Team ──────────────────────────────────────────────────── */
  {
    keywords: ["team", "leadership", "board", "directors", "founder", "staff", "who runs", "executive", "director", "dida"],
    response:
      "ASREP Africa is led by an experienced board and executive team:\n\n• **Dida E. Fayo** — Executive Director (PhD Candidate, former NRT Director of Programs)\n• **Prof Nura Mohamed** — Chairman (Director General, Kenya School of Government)\n• **Jennifer Maurer** — Strategy Advisor (28 years USAID, $600M PREG portfolio)\n• **Boaz Ogada** — Climate & NbS Expert (Bennett Institute, Cambridge)\n• **Issa Gedi** — ASAL Policy Expert (former NRT Chief Programs Officer)\n• **Canon Dr. Scholar Kiilu** — Peacebuilding & Gender Expert\n• **FCPA Abudo Dambala** — Finance & Audit (CPA + CISA)\n\nVisit our Leadership page for full bios!",
  },

  /* ── Partners ───────────────────────────────────────────────────────────── */
  {
    keywords: ["partners", "partnerships", "funders", "donors", "collaborate", "institutions", "supported by"],
    response:
      "We work with a wide range of partners across government, civil society, and the international community:\n\n🏛️ **Government**: KSG, KFS, KWS, NDMA, NCIC, FCDC\n🤝 **Civil Society**: Mercy Corps, Interpeace, RPPL, MID-P, IUA, HAIPS, PROCMURA, GEN\n🌐 **International**: San Diego Zoo Wildlife Alliance Kenya, Alliance for Peacebuilding, Jameel Observatory\n\nInterested in partnering with us? Visit our Partner page or email asrepafrica@gmail.com!",
  },

  /* ── Donate ─────────────────────────────────────────────────────────────── */
  {
    keywords: ["donate", "donation", "support", "give", "fund", "money", "contribute", "sponsor", "financial", "mpesa", "payment"],
    response:
      "Thank you for considering supporting ASREP Africa's work! 🙏\n\nYou can donate through our website's **Donate page**, which supports:\n• 📱 **M-Pesa** (mobile money)\n• 💳 **Card payments**\n• 🏦 **Bank transfer**\n\nEvery contribution — large or small — helps communities in Kenya's ASALs build resilience, restore nature, and sustain peace.\n\nYou can also email us at asrepafrica@gmail.com for direct donation arrangements.",
  },

  /* ── Volunteer ──────────────────────────────────────────────────────────── */
  {
    keywords: ["volunteer", "volunteering", "help", "intern", "internship", "work with", "join"],
    response:
      "We welcome volunteers who are passionate about ASAL resilience, peacebuilding, conservation, and community development!\n\nFill out our **Volunteer Form** on the Get Involved page, sharing your skills and availability. We'll be in touch about current opportunities.\n\nYou can also email us at asrepafrica@gmail.com to start a conversation.",
  },

  /* ── Careers / Jobs ─────────────────────────────────────────────────────── */
  {
    keywords: ["career", "job", "vacancy", "hiring", "employment", "position", "application", "tender"],
    response:
      "We occasionally advertise open positions and tenders on our **Careers & Tenders page**. We recommend checking it regularly as opportunities arise.\n\nFor proactive enquiries, you're welcome to send your CV and a cover letter to asrepafrica@gmail.com.",
  },

  /* ── Contact ────────────────────────────────────────────────────────────── */
  {
    keywords: ["contact", "reach", "email", "phone", "address", "location", "office", "where", "find you"],
    response:
      "You can reach ASREP Africa through:\n\n📧 **Email**: asrepafrica@gmail.com\n📞 **Phone**: +254-7336-87149\n📍 **Location**: Isiolo County, Kenya\n🌐 **Website**: asrepafrica.org\n\nOur **Contact page** also has a direct message form — we aim to respond within 3–5 working days.",
  },

  /* ── Media / Press ──────────────────────────────────────────────────────── */
  {
    keywords: ["guardian", "biographic", "media", "press", "news", "featured", "article", "coverage", "published"],
    response:
      "ASREP Africa has received international media recognition:\n\n📰 **The Guardian** (March 2026): Featured in a report on conservation without US aid — highlighting our community-led approach\n📖 **Biographic Magazine**: \"The Future of Conservation Without US Aid\" — featuring ED Dida Fayo's vision\n📻 **Nagaa FM**: Local radio sensitisation with ED Dida Fayo\n📰 **People Daily & Standard Digital**: Coverage of the Isiolo eco-champions\n\nThis recognition affirms ASREP's growing role in global conservation discourse.",
  },

  /* ── Location / Isiolo ──────────────────────────────────────────────────── */
  {
    keywords: ["isiolo", "kenya", "asal", "arid", "semi-arid", "northern kenya", "pastoralist", "pastoral", "rangeland"],
    response:
      "ASREP Africa is based in **Isiolo County**, in Kenya's northern ASALs. We work across the arid and semi-arid lands that make up about 84% of Kenya.\n\nThis region is home to Borana, Samburu, Turkana, and Somali pastoral communities — among the most climate-vulnerable yet ecologically knowledgeable peoples in Africa. Our work is rooted here, led by people from here.",
  },

  /* ── Get involved / Partner ─────────────────────────────────────────────── */
  {
    keywords: ["partner with", "institutional partner", "csr", "corporate", "organisation partner", "mou", "memorandum"],
    response:
      "ASREP Africa welcomes partnerships with institutions, funders, and corporates committed to ASAL resilience.\n\nWe offer three partnership tracks:\n• 🏛️ **Institutional partnerships** — co-design and co-implement programmes\n• 💰 **Funding partnerships** — support specific programmes or operations\n• 🏢 **Corporate CSR** — align your ESG commitments with community impact\n\nVisit our **Partner with Us** page or email asrepafrica@gmail.com to start the conversation!",
  },

  /* ── Publications / Resources ───────────────────────────────────────────── */
  {
    keywords: ["publication", "resources", "report", "annual report", "download", "pdf", "document", "policy brief"],
    response:
      "ASREP Africa's key publications are available on our **Resources page**:\n\n📗 **ASAL IK Vault Series — \"Cows, Women & Land\"** (debut publication)\n📊 **Impact Report 2025–2026** (annual report PDF)\n📋 **Eco-Entrepreneurship Webinar Summary**\n📑 **Institutional Policies** (23 governance & safeguarding documents)\n\nThese are available for download or by request via asrepafrica@gmail.com.",
  },

  /* ── Social media / YouTube ─────────────────────────────────────────────── */
  {
    keywords: ["social media", "youtube", "facebook", "linkedin", "twitter", "instagram", "follow", "subscribe", "channel"],
    response:
      "Follow ASREP Africa on social media to stay connected:\n\n▶️ **YouTube**: @asrepafrica — programme videos and field updates\n💼 **LinkedIn**: Search \"ASREP Africa\" for news and partnerships\n📘 **Facebook**: Follow us for community updates\n\nSubscribe to our newsletter via the footer form on any page to get updates directly to your inbox!",
  },

  /* ── Newsletter ─────────────────────────────────────────────────────────── */
  {
    keywords: ["newsletter", "subscribe", "mailing list", "updates", "email updates", "sign up"],
    response:
      "Stay updated with ASREP Africa's latest news and programme highlights!\n\nScroll to the footer of any page on our website to find the **newsletter sign-up form** — just enter your email address and you'll receive regular updates from the field.",
  },

  /* ── Thank you / Goodbye ────────────────────────────────────────────────── */
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "see you", "take care", "great", "helpful", "awesome", "wonderful"],
    response:
      "You're very welcome! It's a pleasure sharing ASREP Africa's story with you. 🌿\n\nIf you have more questions, I'm always here. And don't forget — you can reach the team directly at asrepafrica@gmail.com.\n\nTogether, we build resilience. Together, we restore nature. Together, we sustain peace. 🕊️",
    weight: 2,
  },

  /* ── Fallback ───────────────────────────────────────────────────────────── */
  {
    keywords: [],
    response:
      "I'm not sure I have a specific answer for that, but I'd love to help! Here are some things I can tell you about:\n\n• Our 6 programmes (climate, peace, research, governance, biodiversity, livelihoods)\n• Our leadership team and board\n• How to donate, volunteer, or partner with us\n• Our impact numbers and publications\n• How to contact us\n\nWhat would you like to know? 😊",
    weight: -1, // Used only as last resort
  },
];

/* ─── Scoring engine ─────────────────────────────────────────────────────── */

function scoreEntry(input: string, entry: KnowledgeEntry): number {
  const lower = input.toLowerCase();
  let score = 0;

  for (const kw of entry.keywords) {
    if (lower.includes(kw.toLowerCase())) {
      // Longer keyword matches score higher (more specific)
      score += kw.split(" ").length * 2;
    }
  }

  // Only apply weight when at least one keyword matched; otherwise weight
  // would inflate unmatched entries and defeat the bestScore <= 0 fallback.
  return score > 0 ? score + (entry.weight ?? 0) : 0;
}

function findBestResponse(userMessage: string): string {
  let bestScore = -Infinity;
  let bestEntry = KNOWLEDGE_BASE[KNOWLEDGE_BASE.length - 1]; // fallback

  for (const entry of KNOWLEDGE_BASE) {
    // Skip the fallback entry in scoring
    if (entry.keywords.length === 0) continue;

    const score = scoreEntry(userMessage, entry);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // If best score is 0 and no match found, return fallback
  if (bestScore <= 0) {
    bestEntry = KNOWLEDGE_BASE[KNOWLEDGE_BASE.length - 1];
  }

  return bestEntry.response;
}

/* ─── Route handler ──────────────────────────────────────────────────────── */

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 8_192) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  // Rate limit: 30 requests per IP per 10 minutes (chat-specific bucket)
  const ip = getClientIp(req);
  const { allowed, retryAfterSeconds } = await checkRateLimit(`chat:${ip}`, 30, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { messages } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages required" }, { status: 400 });
  }

  // Take the last user message
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  // Guard against excessively long inputs
  if (lastUserMessage.length > 500) {
    return NextResponse.json({ error: "Message too long. Maximum 500 characters." }, { status: 400 });
  }

  const response = findBestResponse(lastUserMessage);

  // Stream the response character by character for a natural typing effect
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // Emit response in small chunks to create a smooth typing effect
      const words = response.split(" ");
      let i = 0;
      const tick = setInterval(() => {
        if (i >= words.length) {
          clearInterval(tick);
          controller.close();
          return;
        }
        const chunk = (i === 0 ? "" : " ") + words[i];
        controller.enqueue(encoder.encode(chunk));
        i++;
      }, 18); // ~55 words/second — natural reading pace
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
