// src/interface/interfaceUser.ts
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

// DTO (Data Transfer Object) for creating a new user
export type CreateUserDTO = Omit<IUser, "id">;
