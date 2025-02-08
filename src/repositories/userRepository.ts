import { BaseRepository } from "./baseRepository";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma.user);
  }

  async findById(id: number): Promise<any> {
    const response = await this.model.findUnique({ where: { id } });
    return response;
  }

  async createUser(data: any): Promise<User | null> {
    return await this.model.create({ data });
  }

  public async isEmailExist(email:string){
    const response = await this.model.findUnique({ where: { email } });
    return response
  }
}
