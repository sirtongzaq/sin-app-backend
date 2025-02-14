import { Context, Elysia } from 'elysia';
import { authPlugin } from '../services/authPlugin';


// Middleware to protect routes
export const protectMiddleware = async ({ jwt, set, headers, store }: Context & { jwt: any, store: IStore }) => {
  const authHeader = headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    set.status = 401;
    return { status: "F", error: "Unauthorized: No token provided" };
  }

  const token = authHeader.split(" ").pop();

  try {
    const user = await jwt.verify(token);

    if (!user) {
      set.status = 401;
      return { status: "S", message: "Unauthorized: Invalid token" };
    }

    store.user = user
  } catch (error) {
    set.status = 401;
    return { status: "F", error: "Unauthorized: Invalid token" };
  }
};