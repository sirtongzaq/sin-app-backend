import { Elysia, t } from "elysia";
import {
  createPost,
  getPostById,
  getPostList,
} from "../controllers/postController";
import { authPlugin } from "../services/authPlugin";
import { protectMiddleware } from "../middleware/authProtect";
import { postDTO } from "../dto/postDto";

export const postRoutes = new Elysia({ prefix: "/post" })
  .use(authPlugin)
  .get("/list", getPostList, { beforeHandle: protectMiddleware })
  .get("/find", getPostById, { beforeHandle: protectMiddleware })
  .post("/create", createPost, {
    body: postDTO,
    beforeHandle: protectMiddleware,
  });
