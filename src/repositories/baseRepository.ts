import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BaseRepository<T> {
  model: any;

  constructor(model: any) {
    this.model = model;
  }

  async find(data: Partial<T>): Promise<T> {
    const response = await this.model.findUnique({ where: data });
    return response;
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create({ data });
  }
}
