import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "server/uploads")));

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/statistics", statRoutes);
app.use("/api/weather", weatherRoutes);

export default app;
