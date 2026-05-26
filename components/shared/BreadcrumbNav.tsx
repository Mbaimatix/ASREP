import Link from "next/link";

type Crumb = { label: string; href?: string };

type Props = {
  crumbs: Crumb[];
  /** When true, uses white text for dark backgrounds (e.g. hero) */
  dark?: boolean;
};

/**
 * Accessible breadcrumb with schema.org BreadcrumbList markup.
 */
export default function BreadcrumbNav({ crumbs, dark = false }: Props) {
  const allCrumbs = [{ label: "Home", href: "/" }, ...crumbs];

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol
        className="flex flex-wrap items-center gap-1.5"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {allCrumbs.map((crumb, i) => {
          const isLast = i === allCrumbs.length - 1;
          return (
            <li
              key={i}
              className="flex items-center gap-1.5"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span
                  className={`text-xs font-medium ${dark ? "text-white/60" : "text-muted"}`}
                  aria-current="page"
                  itemProp="name"
                >
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href ?? "/"}
                    className={`text-xs font-medium transition-colors
                      ${dark
                        ? "text-white/50 hover:text-gold"
                        : "text-muted hover:text-forest"
                      }`}
                    itemProp="item"
                  >
                    <span itemProp="name">{crumb.label}</span>
                  </Link>
                  <svg
                    className={`w-3 h-3 ${dark ? "text-white/30" : "text-muted/40"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
              <meta itemProp="position" content={String(i + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
