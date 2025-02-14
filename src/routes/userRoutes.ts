// src/routes/userRoutes.ts
import { Elysia, t } from "elysia";
import { findUser, getUsers } from "../controllers/userController";
import { protectMiddleware } from "../middleware/authProtect";
import { authPlugin } from "../services/authPlugin";

export const userRoutes = new Elysia({ prefix: "/user" })
  .use(authPlugin)
  .get("/users", getUsers, { beforeHandle: protectMiddleware })
  .post("/profile", findUser, {
    body: t.Object({
      id: t.Optional(t.String()),
      email: t.Optional(t.String()),
      user_name: t.Optional(t.String()),
    }),
    beforeHandle: protectMiddleware,
  });
