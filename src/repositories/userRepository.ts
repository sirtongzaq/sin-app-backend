import { BaseRepository } from "./baseRepository";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma.user);
  }

  async find(body: any): Promise<any> {
    try {
      const response = await this.model.findUnique({ where: body });
      return response;
    } catch (e) {
      console.error("Error finding user:", e);
      return e;
    }
  }

  async createUser(data: any): Promise<User | null> {
    return await this.model.create({ data });
  }

  // async findByEmail(email: string): Promise<any> {
  //   try {
  //     const response = await this.model.findUnique({ where: { email } });
  //     return response;
  //   } catch (e) {
  //     console.error("Error finding email:", e);
  //     return e;
  //   }
  // }

  // public async isEmailExist(email: string) {
  //   const response = await this.model.findUnique({ where: { email } });
  //   return response;
  // }
}
