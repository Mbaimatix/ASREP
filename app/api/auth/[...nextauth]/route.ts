import { handlers } from "@/lib/auth";

/**
 * NextAuth v5 route handler.
 * Exports GET and POST from the auth handlers.
 */
export const { GET, POST } = handlers;
