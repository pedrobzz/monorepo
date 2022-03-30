export const __prod__ = process.env.NODE_ENV === "production";

export const baseAPIURL = __prod__
  ? "http://monorepo-api-1:4000"
  : "http://localhost:4000";
