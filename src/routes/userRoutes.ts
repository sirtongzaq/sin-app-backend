import { t } from "elysia";
import User from "../models/user";

export const userRoutes = {
  get: {
    path: "/users",
    async handler() {
      return await User.findAll();
    },
  },
  
  post: {
    path: "/users",
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
    async handler({body} : {body:any}) {
      try {
        const user = await User.create(body);
        return user;
      } catch (error) {
        return { error: "Failed to create user" };
      }
    },
  },
};