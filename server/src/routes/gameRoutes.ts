import { Router } from "express";
import { createGame, listGames } from "../controllers/gameController.js";
const router = Router();

router.get("/", listGames);
router.post("/", createGame);

export default router;
