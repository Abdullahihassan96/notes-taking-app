import Note from "../models/Note.js";

export async function createNote(req, res, next) {
  try {
    const { title, content = "", tags = [], pinned = false } = req.body;
    if (!title || !title.trim()) {
      res.status(400);
      throw new Error("Title is required");
    }
    const note = await Note.create({ title: title.trim(), content, tags, pinned });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
}

export async function getNotes(req, res, next) {
  try {
    const { q, tag, pinned } = req.query;
    const filter = {};
    if (q) {
      filter.$text = { $search: q };
    }
    if (tag) {
      filter.tags = tag;
    }
    if (typeof pinned !== "undefined") {
      filter.pinned = pinned === "true";
    }

    const notes = await Note.find(filter).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
}

export async function getNoteById(req, res, next) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }
    res.json(note);
  } catch (err) {
    next(err);
  }
}

export async function updateNote(req, res, next) {
  try {
    const { title, content, tags, pinned } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (typeof title !== "undefined") note.title = title;
    if (typeof content !== "undefined") note.content = content;
    if (typeof tags !== "undefined") note.tags = tags;
    if (typeof pinned !== "undefined") note.pinned = pinned;

    const updated = await note.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteNote(req, res, next) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }
    await note.deleteOne();
    res.json({ message: "Note removed" });
  } catch (err) {
    next(err);
  }
}
