import { Elysia, t } from "elysia";
import User from "../models/user";

export const userRoutes = new Elysia()
  .get("/users", async () => {
    return await User.findAll();
  })
  .get("/test", async () => {
    return await User.findAll();
  })
  .post(
    "/users",
    async ({ body }) => {
      try {
        const user = await User.create(body);
        return user;
      } catch (error) {
        return { error: "Failed to create user" };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  );
