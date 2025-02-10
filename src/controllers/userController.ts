// src/controllers/userController.ts

import { Context } from "elysia";
import { responseDTO } from "../dto/responseDto";
import { SignUpDTO } from "../dto/userDto";
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

export const getUsers = async ({ set }: Context) => {
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

// export const getUserById = async ({ params }: { params: any }) => {
//   const { id } = params;
//   const response = await userService.findUserById(Number(id));
//   return response;
// };

//POST MEDTHOD

export const createUser = async ({ set, body }: Context): Promise<responseDTO> => {
  try {
    const result = await userService.createUser({ body });
    if (result?.error) {
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
    console.error("Error in createUser controller:", error);
    set.status = 500;
    return {
      status: "F",
      message: "Internal server error",
    };
  }
};

export const createUserx = async ({
  set,
  request,
  body,
}: {
  set: any;
  request: any;
  body: SignUpDTO;
}) => {
  try {
    const respone = await userService.createUser({ body });
    set.status = 200;
    return {
      data: respone,
      // status: respone?.status,
    };
  } catch (error) {
    set.status = 500;
    console.error("Error creating user:", error);
    return { error: "Failed to create user. Please try again." };
  }
};

export const singIn = () => {};
