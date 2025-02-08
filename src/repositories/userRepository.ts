import { BaseRepository } from "./baseRepository";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma.user);
  }

  async findById(id: number): Promise<User | null> { //ตรงนี้ error
    console.log("id", id)
    return await this.model.findUnique({ where: { id } }); 
  }

  async createUser(data: any): Promise<User | null> {
    return await this.model.create({ data });
  }
}
