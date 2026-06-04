// Instrumentation — loaded once per server process by Next.js.
// Sentry is not currently installed. To enable error monitoring:
// 1. npm install @sentry/nextjs
// 2. Add NEXT_PUBLIC_SENTRY_DSN to your environment variables
// 3. Uncomment the Sentry.init blocks below
export async function register() {
  // No-op: Sentry is not installed.
  // When @sentry/nextjs is added to package.json, re-enable the init below:
  //
  // if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  // if (process.env.NEXT_RUNTIME === "nodejs") {
  //   const Sentry = await import("@sentry/nextjs");
  //   Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, ... });
  // }
  // if (process.env.NEXT_RUNTIME === "edge") {
  //   const Sentry = await import("@sentry/nextjs");
  //   Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, ... });
  // }
}
