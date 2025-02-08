// src/routes/userRoutes.ts
import { Elysia, t } from "elysia";
import { createUser, findUsers, getUsers } from "../controllers/userController";

const BodySchema = t.Object({
  name: t.String(),
  email: t.String(),
});

export const userRoutes = new Elysia()
  .post("/create", createUser, {
    body: BodySchema,
  })
  .get("/users", getUsers)
  .post("/users", findUsers, {
    body: t.Object({
      id: t.Number(),
    }),
  });
