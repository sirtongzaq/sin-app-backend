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

  createUser = async ({ body }: { body: any }) => {
    try {
      const { email, password, user_name, user_image } = body;
      // check value body
      if (!email || !password || !user_name) {
        return {
          status: "F",
          error: "email or password or user_name is missing", // we choose handle each case ***
        };
      }
      // hash password use bcrypt
      const hashedPassword = await this.hashpassword(password);
      // check email and username already exsist
      const emailExist = await this.UserRepository.find({ email: email });
      const usernameExist = await this.UserRepository.find({
        user_name: user_name,
      });

      if (emailExist) {
        return { status: "F", error: "Email already registered" };
      }

      if (usernameExist) {
        return { status: "F", error: "Username already registered" };
      }

      // create new user
      const newUser = await this.UserRepository.create({
        user_name,
        user_image: user_image ? user_image : "",
        email,
        password: hashedPassword,
      });

      return {
        status: "S",
        message: "User create successfully",
        data: newUser,
      };
    } catch (e) {
      console.error("Error creating user:", e);
      return {
        status: "F",
        message: "Failed to create user. Please try again.",
        error: e,
      };
    }
  };

  // public async findUserById(id: number) {
  //   try {
  //     // check value body
  //     if (!id) {
  //       return { status: "F", error: "id is missing" };
  //     }
  //     const user = await this.UserRepository.findById(id);
  //     return user;
  //   } catch (e) {
  //     console.error("Error find user:", e);
  //     return {
  //       status: "F",
  //       message: "Failed to find user. Please try again.",
  //       error: e,
  //     };
  //   }
  // }

  private async hashpassword(password: string) {
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 4,
    });
    return hashedPassword;
  }

  private async vertifyPassword(password: string, passwordDB: string) {
    const hashpassword = this.hashpassword(password);
    const isMatch = await Bun.password.verify(
      String(hashpassword),
      String(passwordDB)
    );

    return isMatch;
  }
}
