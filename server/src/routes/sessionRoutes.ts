import { Router } from "express";
import { startSession, stopSession } from "../controllers/sessionController.js";
const router = Router();

router.post("/start", startSession);
router.patch("/stop", stopSession);

export default router;
