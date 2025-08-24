import { useEffect, useState } from "react";

export default function NoteForm({ onSubmit, initial }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setContent(initial.content || "");
      setTags((initial.tags || []).join(", "));
      setPinned(!!initial.pinned);
    }
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      pinned,
    };
    onSubmit(payload);

    //reset the form
    setTitle("");
    setContent("");
    setTags("");
    setPinned(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ display: "grid", gap: 8 }}
    >
      <input
        className="input"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="input"
        placeholder="Content"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className="input"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={pinned}
          onChange={(e) => setPinned(e.target.checked)}
        />
        Pinned
      </label>
      <button className="button primary" type="submit">
        {initial ? "Update" : "Add"} Note
      </button>
    </form>
  );
}
