import { t } from "elysia";

export const signUpDTO = t.Object({
  email: t.String({
    format: "email",
    error: {
      test: "test",
    },
  }),
  password: t.String(),
  user_name: t.String(),
  user_image: t.Optional(t.String()),
});

export type signUpDTO = typeof signUpDTO.static;

export const signInDTO = t.Object({
  user_name: t.String(),
  password: t.String(),
});

export type signInDTO = typeof signInDTO.static;
