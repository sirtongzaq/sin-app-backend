import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export class BaseRepository<T> {
  model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }

  async findById(id: number): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create({ data });
  }
}