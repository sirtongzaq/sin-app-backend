import { Context } from "elysia";
import { responseDTO } from "../dto/responseDto";
import { PostCommentService } from "../services/postCommentService";

const postCommentService = new PostCommentService();

// export const getPostList = async ({
//   set,
//   store,
// }: Context & { store: IStore }): Promise<responseDTO> => {
//   try {
//     const result = await postService.getPosts();
//     if (result?.error || result.data?.length === 0) {
//       set.status = 400;
//       return {
//         status: result.status,
//         message: result.error || result.message,
//       };
//     }

//     set.status = 200;
//     return {
//       status: result.status,
//       message: result.message,
//       data: result.data,
//     };
//   } catch (error) {
//     console.error("Error in getPostList controller:", error);
//     set.status = 500;
//     return {
//       status: "F",
//       message: "Internal server error",
//     };
//   }
// };

export const createPostComment = async ({
  set,
  body,
  store,
}: Context & { store: IStore }): Promise<responseDTO> => {
  try {
    const result = await postCommentService.createPostComment({ body, store });

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
    console.error("Error in createPostComment controller:", error);
    set.status = 500;
    return {
      status: "F",
      message: "Internal server error",
    };
  }
};

export const getPostCommentById = async ({
  set,
  store,
  query,
}: Context & { store: IStore }): Promise<responseDTO> => {
  try {
    const id = query?.id;
    if (!id) {
      set.status = 400;
      return {
        status: "F",
        message: "Missing or invalid post ID",
      };
    }
    const result = await postCommentService.getPostCommentById({ id });
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
