import { prisma } from "@/server/db/prisma";
import { CreateApplicationDTO } from "./application.dto";

export class ApplicationRepository {
  async create(data: CreateApplicationDTO) {
    return prisma.application.create({ data });
  }

  async findAll() {
    return prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}
