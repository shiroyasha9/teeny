import { getAuthSession } from "@/lib/auth";
import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { prisma } from "../db";

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const session = await getAuthSession();

  return { req, resHeaders, session, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
