import { PrismaClient } from "@prisma/client";

const prismaCLientSingletom = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaCLientSingletom();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
