import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

// Use __dirname in CJS (works with your tsconfig)
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", upload.single("profilePic"), createUser);
router.delete("/:id", deleteUser);

export default router;
