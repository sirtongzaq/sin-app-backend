import { Elysia, t } from "elysia";
import {
  createPost,
  getPostById,
  getPostList,
} from "../controllers/postController";
import { authPlugin } from "../services/authPlugin";
import { protectMiddleware } from "../middleware/authProtect";
import { postDTO } from "../dto/postDto";
import { customValidationErrorHandler } from "../services/globalPugin";

export const postRoutes = new Elysia({ prefix: "/post" })
  .onError(({ code, error, set }) => {
    return customValidationErrorHandler(code, error, set);
  })
  .use(authPlugin)
  .get("/list", getPostList, { beforeHandle: protectMiddleware })
  .get("/find", getPostById, { beforeHandle: protectMiddleware })
  .post("/create", createPost, {
    body: postDTO,
    beforeHandle: protectMiddleware,
  });
