import express from "express";
import { Router } from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = Router();

// router.get("/", getNotes);

// router.get("/:id", getNoteById);

// router.post("/", createNote);

// router.put("/:id", updateNote);

// router.delete("/:id", deleteNote);

router.route("/").get(getNotes).post(createNote);
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
