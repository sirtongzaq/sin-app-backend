// src/controllers/userController.ts
import { UserService } from "../services/userService";
const query = new UserService();

export const findUsers = async ({ body }: { body: any }) => {
  try {
    console.log("body>>>", body);
    const user = await query.findUser(body.id);
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
    const user = await query.getUsers();
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

export const createUser = async ({ body }: { body: any }) => {
  try {
    console.log("body>>>", body);
    const user = await query.createUser({ body });
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
