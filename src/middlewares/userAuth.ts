import { Elysia } from "elysia";
import { prisma } from "../config/prisma";
import { UserRepository } from "../repositories/userRepository";

export const isAuthenticated = (app: Elysia) =>
  // @ts-ignore
  app.derive(async ({ cookie, jwt, set }) => {  // app.derive = every app running is take auth to verify 
    console.log(cookie);
    if (!cookie!.access_token) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }
    
    const User = new UserRepository() //create instant class for use
    
    const { userId } = await jwt.verify(cookie!.access_token);
    if (!userId) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const user = await User.findById(userId)
    if (!user) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }
    return {
      user,
    };
  });
