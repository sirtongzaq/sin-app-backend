// src/routes/userRoutes.ts
import { Elysia, t } from "elysia";
import { findUser, getUsers } from "../controllers/userController";
import { signInDTO } from "../dto/userDto";

export const userRoutes = new Elysia({ prefix: "/user" })
  .get("/users", getUsers)
  .post("/profile", findUser, {
    body: t.Object({
      id: t.Optional(t.String()),
      email: t.Optional(t.String()),
      user_name: t.Optional(t.String()),
    }),
  });
