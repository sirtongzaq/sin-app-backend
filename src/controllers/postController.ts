import { Context } from "elysia";
import { responseDTO } from "../dto/responseDto";
import { PostService } from "../services/postService";

const postService = new PostService();

export const getPostList = async ({ set, store }: Context & { store: IStore }): Promise<responseDTO> => {
  try {
    const result = await postService.getPosts();
    console.log(store.user)
    if (result?.error || result.data?.length === 0) {
      set.status = 400;
      return {
        status: result.status,
        message: result.error || result.message,
      };
    }

    set.status = 200;
    return {
      status: result.status,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("Error in getPostList controller:", error);
    set.status = 500;
    return {
      status: "F",
      message: "Internal server error",
    };
  }
};

export const createPost = async ({ set, body, store }: Context & {store: IStore}): Promise<responseDTO> => {
    try {
      const result = await postService.createPost({ body, store });
  
      if (result?.error) {
        set.status = 400;
        return {
          status: result.status,
          message: result.error || result.message,
        };
      }
  
      set.status = 200;
      return {
        status: result.status,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      console.error("Error in getPostList controller:", error);
      set.status = 500;
      return {
        status: "F",
        message: "Internal server error",
      };
    }
  };