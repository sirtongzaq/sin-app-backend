import { PostRepository } from "../repositories/postRepository";
import { isEmpty } from "../utils/objectUtils";

export class PostService {
  private readonly PostRepository: PostRepository = new PostRepository();
  getPosts = async () => {
    try {
      const post = await this.PostRepository.findAll();
      if (!post || post.length === 0) {
        return { status: "S", message: "Post not found" };
      }

      return { status: "S", message: "Success", data: post };
    } catch (e) {
      console.error("Error finding post:", e);
      return { status: "F", message: "Error finding post", error: e };
    }
  };

  createPost = async ({ body, store }: { body: any, store: IStore }) => {
    try {
      if (isEmpty(body)) {
        return { status: "F", message: "Body is missing" };
      }

      const save = {
        user_id : store.user?.id,
        title: body.title,
        content: body.content,
        post_image: body.post_image || [],
        isAnonymous: body.isAnonymous || false
      }

      console.log(">>>>>>>>",save)
      const postSave = await this.PostRepository.createPost(save);
      return {
        status: "S",
        message: "Post create successfully",
        data: postSave,
      };
    } catch (e) {
      console.error("Error creating post:", e);
      return { status: "F", message: "Error creating post", error: e };
    }
  };
}
