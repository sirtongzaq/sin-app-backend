// src/routes/userRoutes.ts
import { Elysia, t } from "elysia";
import { findUser, getUsers } from "../controllers/userController";
import { protectMiddleware } from "../middleware/authProtect";
import { authPlugin } from "../services/authPlugin";
import { customValidationErrorHandler } from "../services/globalPugin";

export const userRoutes = new Elysia({ prefix: "/user" })
  .onError(({ code, error, set }) => {
    return customValidationErrorHandler(code, error, set);
  })
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
