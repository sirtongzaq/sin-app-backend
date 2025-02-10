import { t } from "elysia";

export const signInDTO = t.Object({
  email: t.String({
    format: "email",
    error: 'Invalid email :('
  }),
  password: t.String(),
  user_name: t.String(),
  user_image: t.Optional(t.String()),
});

export type signInDTO = typeof signInDTO.static;

export const singUpDto = t.Object({
  user_name: t.String(),
  email: t.String(),
  password: t.String(),
});

export type SignUpDTO = typeof singUpDto.static;
