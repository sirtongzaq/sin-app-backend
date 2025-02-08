// src/controllers/userController.ts
import { UserRepository } from "../repositories/userRepository";

export class UserService {
  private readonly User: UserRepository = new UserRepository();

  findUser = async ({ body }: { body: any }) => {
    try {
      const user = await this.User.findById(body);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      return { error: "Failed to create user. Please try again." };
    }
  };

  getUsers = async () => {
    try {
      const user = await this.User.findAll();
      return user;
    } catch (e) {
      console.error("Error creating user:", e);
      return { error: "Failed to create user. Please try again." };
    }
  };

  createUser = async ({ body }: { body: any }) => {
    try {
      const user = await this.User.createUser(body);
      return user;
    } catch (e) {
      console.error("Error creating user:", e);
      return { error: "Failed to create user. Please try again." };
    }
  };
}
