import { Elysia, error, t } from "elysia";
import { authPlugin } from "../services/authPlugin";
import { protectMiddleware } from "../middleware/authProtect";
import {
  createPostComment,
  getPostCommentById,
} from "../controllers/postCommentController";
import { postCommentDTO } from "../dto/postCommentDto";
import { customValidationErrorHandler } from "../services/globalPugin";

export const postCommentRoutes = new Elysia({ prefix: "/postComment" })
  .onError(({ code, error, set }) => {
    return customValidationErrorHandler(code, error, set);
  })
  .use(authPlugin)
  // .get("/list", getPostCommentById, { beforeHandle: protectMiddleware })
  .get("/find", getPostCommentById, { beforeHandle: protectMiddleware })
  .post("/create", createPostComment, {
    body: postCommentDTO,
    beforeHandle: protectMiddleware,
  });
