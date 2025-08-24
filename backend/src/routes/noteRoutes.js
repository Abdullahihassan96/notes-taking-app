import { Router } from "express";
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from "../controllers/noteController.js";

const router = Router();

router.route("/").get(getNotes).post(createNote);
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
