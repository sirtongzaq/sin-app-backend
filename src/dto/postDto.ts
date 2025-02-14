import { t } from "elysia";

export const postDTO = t.Object({
  title: t.String(),
  content: t.String(),
  post_image: t.Optional(t.Array(t.String())),
  isAnonymous: t.Optional(t.Boolean()),
});

export type postDTO = typeof postDTO.static;
