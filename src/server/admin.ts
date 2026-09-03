import { createServerFn } from "@tanstack/react-start";
import {
  checkAdminPassword,
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
} from "./auth";

export const getAdminSessionFn = createServerFn({ method: "GET" }).handler(async () => {
  return { isAdmin: await isAdminAuthenticated() };
});

export const loginFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => input as { password: string })
  .handler(async ({ data }) => {
    if (!checkAdminPassword(data.password)) {
      return { ok: false as const, error: "Incorrect password." };
    }
    await createAdminSession();
    return { ok: true as const };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  await destroyAdminSession();
  return { ok: true as const };
});
