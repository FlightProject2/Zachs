// Server-only admin session helpers, built on TanStack Start's built-in
// sealed-cookie session support (encrypted + signed, httpOnly). This is a
// deliberately minimal stand-in for real auth: one shared admin password
// from an env var, no user accounts. Swap for Supabase Auth later — only
// this file and src/server/admin.ts need to change.
import { clearSession, getSession, updateSession } from "@tanstack/react-start/server";

interface AdminSessionData {
  isAdmin?: boolean;
}

const SESSION_NAME = "zachs_admin";

// useSession/getSession require a password of at least 32 characters to
// derive encryption keys. This fallback is fine for local development only
// — set a real ADMIN_SESSION_SECRET before deploying anywhere reachable.
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ??
  "dev-only-insecure-session-secret-change-me-before-deploying";

function sessionConfig() {
  return {
    password: SESSION_SECRET,
    name: SESSION_NAME,
    maxAge: 60 * 60 * 12, // 12 hours
  };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getSession<AdminSessionData>(sessionConfig());
  return session.data.isAdmin === true;
}

export async function createAdminSession(): Promise<void> {
  await updateSession<AdminSessionData>(sessionConfig(), { isAdmin: true });
}

export async function destroyAdminSession(): Promise<void> {
  await clearSession(sessionConfig());
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  return expected.length > 0 && password === expected;
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new UnauthorizedError();
  }
}
