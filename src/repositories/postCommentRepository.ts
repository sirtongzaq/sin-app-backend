import { BaseRepository } from "./baseRepository";
import { prisma } from "../config/prisma";
import { PostComment } from "@prisma/client";

export class PostCommentRepository extends BaseRepository<PostComment> {
  constructor() {
    super(prisma.postComment);
  }

  async findPostComment(postId: string): Promise<any> {
    const response = await this.model.findUnique({
      where: { id: postId },
      include: {
        post: true,
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
