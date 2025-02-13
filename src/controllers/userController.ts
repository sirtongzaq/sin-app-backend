// src/controllers/userController.ts

import { Context } from "elysia";
import { responseDTO } from "../dto/responseDto";
import { UserService } from "../services/userService";
const userService = new UserService();

// GET METHOD

export const findUser = async ({ set, body }: Context) : Promise<responseDTO> => {
  try {
    const result = await userService.findUser({body});
    if (result.error) {
      set.status = 400;
      return {
        status: result.status,
        message: result.error ? result.error : result.message,
      };
    }
    set.status = 200;
    return {
      status: result.status,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("Error in findUsers controller:", error);
    set.status = 500;
    return {
      status: "F",
      message: "Internal server error",
    };
  }
};

export const getUsers = async ({ set }: Context) : Promise<responseDTO> => {
  try {
    const users = await userService.getUsers();
    if (!users || users.length === 0) {
      set.status = 404;
      return { status: "F", message: "Users not found", data: null };
    }
    set.status = 200;
    return {
      status: "S",
      message: "Users retrieved successfully",
      data: users,
    };
  } catch (error) {
    set.status = 500;
    return { status: "F", message: "Failed to retrieve users", data: null };
  }
};

