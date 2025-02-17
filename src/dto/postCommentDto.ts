import { t } from "elysia";

export const postCommentDTO = t.Object({
  post_id: t.String(),
  content: t.String(),
});

export type postCommentDTO = typeof postCommentDTO.static;
