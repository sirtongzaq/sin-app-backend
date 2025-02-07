// src/controllers/userController.ts
import { IUser, CreateUserDTO } from "../interface/interfaceUser";
import User from "../models/user";

export const getUsers = async (): Promise<IUser[]> => {
  return await User.findAll();
};

export const createUser = async ({ body }: { body: CreateUserDTO }) => {
  try {
    const user = await User.create(body);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user. Please try again." };
  }
};
