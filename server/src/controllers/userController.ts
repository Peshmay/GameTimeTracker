import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/prisma";

// Accepts file OR a string path (e.g., "/avatars/fox.png")
const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  profilePic: z.string().optional(), // allow client-sent avatar string
});

export async function createUser(req: Request, res: Response) {
  try {
    // parse base fields + optional profilePic string
    const parsed = userSchema.parse({
      ...req.body,
      profilePic: req.body.profilePic,
    });

    // if file uploaded -> use /uploads/<filename>
    // else if client sent an avatar path -> use that
    // else -> default image
    const profilePic = req.file
      ? `/uploads/${req.file.filename}`
      : parsed.profilePic || "/uploads/default.png";

    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        profilePic,
      },
    });

    res.json(user);
  } catch (e: any) {
    res.status(400).json({ message: e.message || "Invalid data" });
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

// Delete with safe handling if sessions exist
export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    // If your schema doesn’t have onDelete: Cascade, remove sessions first:
    await prisma.session.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    // If you prefer, detect Prisma P2003 here and return 409
    res.status(500).json({ message: "Error deleting user" });
  }
}
