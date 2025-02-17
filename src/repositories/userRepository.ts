import { BaseRepository } from "./baseRepository";
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma.user);
  }
}
