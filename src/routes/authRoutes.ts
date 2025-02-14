import { Elysia } from "elysia";
import { signIn, signUp } from "../controllers/authController";
import { signUpDTO, signInDTO } from "../dto/userDto";
import { authPlugin } from "../services/authPlugin";
import { protectMiddleware } from "../middleware/authProtect";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(authPlugin) // Use JWT plugin
  .post("/sign-up", signUp, { body: signUpDTO })
  .post("/sign-in", signIn, { body: signInDTO })
  // test protect route ?
  .get(
    "/protected",
    async ({ store }: { store: any }) => {
      const user = store.user;
      return { message: "Welcomes!", user };
    },
    { beforeHandle: protectMiddleware }
  );
