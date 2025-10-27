import { Router } from "express";
import { getStatistics } from "../controllers/statController.js";
const router = Router();

router.get("/", getStatistics);

export default router;
