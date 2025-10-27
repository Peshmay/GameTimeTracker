import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export async function createUser(req: Request, res: Response) {
  try {
    const body = userSchema.parse(req.body);
    const profilePic = req.file
      ? `/uploads/${req.file.filename}`
      : "/uploads/default.png";
    const user = await prisma.user.create({ data: { ...body, profilePic } });
    res.json(user);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function getUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      sessions: { include: { game: true }, orderBy: { startedAt: "desc" } },
    },
  });
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
}
