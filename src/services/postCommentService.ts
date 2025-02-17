import { PostCommentRepository } from "../repositories/postCommentRepository";
import { isEmpty } from "../utils/objectUtils";

export class PostCommentService {
  private readonly PostCommentRepository: PostCommentRepository = new PostCommentRepository();
//   getPostComments = async () => {
//     try {
//       const post = await this.PostCommentRepository.findAllPostWithCommentsAndVotes();
//       if (!post || post.length === 0) {
//         return { status: "S", message: "Post not found" };
//       }

//       return { status: "S", message: "Success", data: post };
//     } catch (e) {
//       console.error("Error finding post:", e);
//       return { status: "F", message: "Error finding post", error: e };
//     }
//   };

  getPostCommentById = async ({ id }: { id: string }) => {
    try {
      const post = await this.PostCommentRepository.findPostComment(id);
      if (!post) {
        return { status: "S", message: "PostComment not found" };
      }

      return { status: "S", message: "Success", data: post };
    } catch (e) {
      console.error("Error finding post:", e);
      return { status: "F", message: "Error finding post comment", error: e };
    }
  };

  createPostComment = async ({ body, store }: { body: any; store: IStore }) => {
    try {
      if (isEmpty(body)) {
        return { status: "F", message: "Body is missing" };
      }

      const save = {
        user_id: store.user?.id,
        post_id: body.post_id,
        content: body.content,
      };

      const postCommentSave = await this.PostCommentRepository.create(save);
      return {
        status: "S",
        message: "PostComment create successfully",
        data: postCommentSave,
      };
    } catch (e) {
      console.error("Error creating post comment:", e);
      return { status: "F", message: "Error creating post comment", error: e };
    }
  };
}
