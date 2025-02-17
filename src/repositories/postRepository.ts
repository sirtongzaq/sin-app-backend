import { BaseRepository } from "./baseRepository";
import { prisma } from "../config/prisma";
import { Post } from "@prisma/client";

export class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(prisma.post);
  }

  async findAllPostWithCommentsAndVotes(): Promise<any> {
    const response = await this.model.findMany({
      include: {
        comments: {
          include: {
            user: true,
            votes: true,
          },
        },
        votes: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return response;
  }

  async findPostWithCommentsAndVotes(postId: string): Promise<any> {
    const response = await this.model.findUnique({
      where: { id: postId },
      include: {
        comments: {
          include: {
            user: true,
            votes: true,
          },
        },
        votes: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
    return response;
  }
}
