// src/utils/prisma.ts
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL! },
  },
});
