// src/plugins/authPlugin.ts
import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authPlugin = new Elysia().use(
  jwt({
    name: "jwt", // This makes `ctx.jwt` available in routes
    secret: JWT_SECRET,
    exp: "7d",
  })
);
