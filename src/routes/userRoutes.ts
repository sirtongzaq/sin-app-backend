// src/routes/userRoutes.ts
import { Elysia, t } from "elysia";
import { createUser, findUsers, getUserById, getUsers } from "../controllers/userController";
import { signInDto, singUpDto } from "../dto/userDto";

const BodySchema = t.Object({
  name: t.String(),
  email: t.String(),
});

export const userRoutes = new Elysia()
  .post("/create", createUser, {
    body: singUpDto,
  }
)
  .get("/user/:id", getUserById)
  .get("/users", getUsers)
  .post("/users", findUsers, {
    body: t.Object({
      id: t.Number(),
    }),
  });