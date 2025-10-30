import { Router } from "express";
import multer from "multer";
import express from "express";
import path from "path";
import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "backend/uploads"),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.post("/", upload.single("profilePic"), createUser);

export default router;
