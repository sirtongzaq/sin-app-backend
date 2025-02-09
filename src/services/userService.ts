// src/controllers/userController.ts
import { UserRepository } from "../repositories/userRepository";
import { isNullOrUndefined } from "../utils/objectUtils";

export class UserService {
  private readonly UserRepository: UserRepository = new UserRepository();

  findUser = async ({ body }: { body: any }) => {
    try {
      const user = await this.UserRepository.findById(body);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      return { error: "Failed to create user. Please try again." };
    }
  };

  public async findUserById(id: number) {
    try {
      const response = await this.UserRepository.findById(id);
      return response;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  getUsers = async () => {
    try {
      const user = await this.UserRepository.findAll();
      return user;
    } catch (e) {
      console.error("Error creating user:", e);
      return { error: "Failed to create user. Please try again." };
    }
  };

  createUser = async ({ body }: { body: any }) => {
    try {
      const payload = body
      const email = payload?.email;
      const hashpassword =  await this.hashpassword(body?.password);
      const emailExist = await this.UserRepository.isEmailExist(email);
      payload.password = hashpassword

      if (!isNullOrUndefined(emailExist)) {
        return { error: "can't register", staus: 400 };
      }

      const user = await this.UserRepository.createUser(payload);
      return user;
    } catch (e) {
      console.error("Error creating user:", e);
      return { error: "Failed to create user. Please try again." };
    }
  };

  private async hashpassword(password: String) {
    const hashpassword = await Bun.password.hash(String(password), {
      algorithm: "bcrypt",
    });
    return hashpassword;
  }

  private async vertifyPassword(password:String){
    const hashpassword = this.hashpassword(password) /// จากเมล
    const isMatch = await Bun.password.verify(String(password), String(hashpassword));

    return isMatch
  }

  public async testPg(){
    const response = await this.UserRepository.findUserwithPagination(1,10)
    const result = {
      page:null,
      totalItems:null,
      data:response
    }
    return result
  }
  

}
