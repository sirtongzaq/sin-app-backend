import { Post } from "@prisma/client";
import { BaseRepository } from "./baseRepository";
import { prisma } from "../config/prisma";

export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(prisma.post);
  }

  public async findPostwithPagination(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const response = await this.model.findMany({
      skip: offset,
      limit: limit,
    });
    return response;
  }
}
