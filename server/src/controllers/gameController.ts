import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
const prisma = new PrismaClient();

const gameSchema = z.object({ name: z.string().min(1) });

export async function listGames(_req: Request, res: Response) {
  const games = await prisma.game.findMany({ orderBy: { id: "asc" } });
  res.json(games);
}

export async function createGame(req: Request, res: Response) {
  try {
    const data = gameSchema.parse(req.body);
    const game = await prisma.game.create({ data });
    res.json(game);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
}
