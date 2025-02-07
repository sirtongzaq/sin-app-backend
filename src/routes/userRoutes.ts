// src/routes/userRoutes.ts
import { Elysia, t } from "elysia";
import { getUsers, createUser } from "../controllers/userController";

export const userRoutes = new Elysia()
  .get("/users", getUsers)
  .post(
    "/users",
    createUser,
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  );
