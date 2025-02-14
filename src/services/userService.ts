// src/controllers/userController.ts
import { error } from "elysia";
import { UserRepository } from "../repositories/userRepository";
import { isEmpty, isNullOrUndefined } from "../utils/objectUtils";

export class UserService {
  private readonly UserRepository: UserRepository = new UserRepository();

  getUsers = async () => {
    try {
      const user = await this.UserRepository.findAll();
      return user;
    } catch (e) {
      console.error("Error creating user:", e);
      return null;
    }
  };

  findUser = async ({ body }: { body: any }) => {
    try {
      if (isEmpty(body)) {
        return { status: "F", error: "Body is missing" };
      }

      const respone = await this.UserRepository.find(body);

      if (isNullOrUndefined(respone)) {
        return {
          status: "S",
          message: "User not found",
          data: [],
        };
      }

      return {
        status: "S",
        message: "User found",
        data: respone,
      };
    } catch (e) {
      return {
        status: "F",
        message: "Failed to find user. Please try again.",
        error: e,
      };
    }
  };
}
