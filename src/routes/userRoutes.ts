// src/routes/userRoutes.ts
import { Elysia, t } from "elysia";
import {
  createUser,
  findUser,
  getUsers,
} from "../controllers/userController";
import { signInDTO, singUpDto } from "../dto/userDto";

export const userRoutes = new Elysia({ prefix: "/user" })
  .get("/users", getUsers)
  .post("/sign-up", createUser ,{
    body: signInDTO
  })
  .post("/sign-in", "")
  .post("/profile", findUser, {
    body: t.Object({
      id: t.Optional(t.String()),
      email: t.Optional(t.String()),
      user_name: t.Optional(t.String())
    })
  })

