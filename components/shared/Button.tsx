import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  /** Render as a Next.js Link when provided */
  href?: string;
  /** Open in new tab */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps & Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps>;
type LinkButtonProps = BaseProps & { href: string };

const variantClasses = {
  primary:
    "bg-cta hover:bg-cta-hover text-white shadow-sm hover:shadow-md hover:-translate-y-0.5",
  secondary:
    "border-2 border-forest text-forest hover:bg-forest hover:text-white",
  ghost:
    "border-2 border-white/40 text-white hover:border-white hover:bg-white/10",
  gold:
    "border-2 border-gold text-gold hover:bg-gold hover:text-forest",
};

const sizeClasses = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

function buildClasses(variant: string, size: string, extra?: string) {
  return [
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl",
    "transition-all duration-200",
    "focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none",
    variantClasses[variant as keyof typeof variantClasses] ?? variantClasses.primary,
    sizeClasses[size as keyof typeof sizeClasses] ?? sizeClasses.md,
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...rest
}: ButtonProps | LinkButtonProps) {
  const classes = buildClasses(variant, size, className);

  if (href) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
