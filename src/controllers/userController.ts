// src/controllers/userController.ts

import { SignInDTO, SignUpDTO } from "../dto/userDto";
import { UserService } from "../services/userService";
const userService = new UserService();

export const findUsers = async ({ body }: { body: any }) => {
  try {
    const user = await userService.findUser(body.id);
    return {
      status: "s",
      message: "success",
      data: user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user. Please try again." };
  }
};

export const getUsers = async () => {
  try {
    const user = await userService.getUsers();
    return {
      status: "s",
      message: "success",
      data: user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user. Please try again." };
  }
};

export const createUser = async ({
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
    return {
      data: respone,
      // status: respone?.status,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user. Please try again." };
  }
};

export const getUserById = async ({ params }: { params: any }) => {
  const { id } = params;
  const response = await userService.findUserById(Number(id));
  return response;
};

export const singIn = () => {};
