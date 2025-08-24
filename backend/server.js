import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import noteRoutes from "./src/routes/noteRoutes.js";
import { notFound, errorHandler } from "./src/middleware/error.js";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: ["http://localhost:5175"], credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "mern-notes-backend",
    time: new Date().toISOString(),
  });
});

// Routes
app.use("/api/notes", noteRoutes);

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  });
