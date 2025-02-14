import { Context } from "elysia";
import { responseDTO } from "../dto/responseDto";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export const signUp = async ({ set, body }: Context): Promise<responseDTO> => {
  try {
    const result = await authService.signUp({ body });

    if (result?.error) {
      set.status = 400;
      return {
        status: result.status,
        message: result.error || result.message,
      };
    }

    set.status = 200;

    const user = result.data?.newUser;

    return {
      status: result.status,
      message: result.message,
      data: { user }, // no need to send data
    };
  } catch (error) {
    console.error("Error in signUp controller:", error);
    set.status = 500;
    return {
      status: "F",
      message: "Internal server error",
    };
  }
};

export const signIn = async ({ set, body, jwt }: Context & { jwt: any }): Promise<responseDTO> => {
  try {
    const result = await authService.signIn({ body, jwt, set });

    if (result?.error) {
      set.status = 400;
      return {
        status: result.status,
        message: result.error || result.message,
      };
    }

    set.status = 200;
    const token = result.data?.token;

    return {
      status: result.status,
      message: result.message,
      data: { token }, // send token to local storage ?
    };
  } catch (error) {
    console.error("Error in signIn controller:", error);
    set.status = 500;
    return {
      status: "F",
      message: "Internal server error",
    };
  }
};