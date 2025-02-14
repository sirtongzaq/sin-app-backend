import { BaseRepository } from "./baseRepository";
import { prisma } from "../config/prisma";
import { Post } from "@prisma/client";

export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(prisma.post);
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

  async createPost(data: any): Promise<Post | null> {
    return await this.model.create({ data });
  }
}
