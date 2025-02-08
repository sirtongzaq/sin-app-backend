import { t } from "elysia";


export const signInDto = t.Object({
  userName: t.String(),
  password: t.String(),
});

export type SignInDTO = typeof signInDto.static;



export const singUpDto = t.Object({
  user_name: t.String(),
  email: t.String(),
  password : t.String()
});

export type SignUpDTO = typeof singUpDto.static;
