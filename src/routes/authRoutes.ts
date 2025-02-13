import { Elysia } from "elysia";
import { signIn, signUp } from "../controllers/authController";
import { signUpDTO, signInDTO } from "../dto/userDto";
import { authPlugin } from "../services/authPlugin";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(authPlugin) // Use JWT plugin
  .post("/sign-up", signUp, { body: signUpDTO })
  .post("/sign-in", signIn, { body: signInDTO })
  // test protect route ?
  .get("/protected", async ({ jwt, set, headers }) => {
    const authHeader = headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      set.status = 401;
      return { error: "Unauthorized: No token provided" };
    }
    console.log("auth", authHeader);
    const token = authHeader.split(" ").pop();
    const user = await jwt.verify(token);

    if (!user) {
      set.status = 401;
      return { error: "Unauthorized: Invalid token" };
    }

    return { message: "Welcome!", user };
  });
