import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { OpenApiMeta } from "trpc-openapi";

const t = initTRPC.meta<OpenApiMeta>().create({
  errorFormatter: ({ error, shape }) => {
    if (
      error.code === "INTERNAL_SERVER_ERROR" &&
      process.env.NODE_ENV === "production"
    ) {
      return { ...shape, message: "Internal server error" };
    }
    return shape;
  },
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
