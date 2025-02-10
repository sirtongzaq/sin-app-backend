import { Elysia, t } from "elysia";

export const postRoutes = new Elysia({ prefix: "/post" })
  .get("/list", "")
  .post("/create", "");
