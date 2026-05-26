type Props = {
  tag?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  id?: string;
};

/**
 * Reusable section header — tag / H2 / subtitle.
 * Handles both left-aligned (default) and centred layouts,
 * and light (dark bg) vs. dark (light bg) text modes.
 */
export default function SectionHeader({
  tag,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  light = false,
  id,
}: Props) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "text-center mx-auto" : ""} max-w-2xl mb-12`}>
      {tag && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] mb-3
            ${light ? "text-gold" : "text-sage"}`}
        >
          {tag}
        </p>
      )}
      <h2
        id={id}
        className={`font-display font-bold text-3xl md:text-4xl leading-tight mb-4
          ${light ? "text-white" : "text-earth"}`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className={light ? "text-gold" : "text-forest"}>
            {titleHighlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg leading-relaxed
            ${light ? "text-white/65" : "text-charcoal/65"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
