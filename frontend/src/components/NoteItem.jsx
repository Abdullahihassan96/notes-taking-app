export default function NoteItem({ note, onEdit, onDelete, onTogglePin }) {
  return (
    <div className="card note">
      <div className="note-title">{note.title}</div>
      {note.content && <div className="note-content">{note.content}</div>}
      <div className="tags">
        {note.tags?.map((t, i) => (
          <span className="pill" key={i}>
            #{t}
          </span>
        ))}
      </div>
      <div className="toolbar">
        <button className="button" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="button danger" onClick={() => onDelete(note._id)}>
          Delete
        </button>
        <button className="button" onClick={() => onTogglePin(note)}>
          {note.pinned ? "Unpin" : "Pin"}
        </button>
      </div>
      <small>Updated: {new Date(note.updatedAt).toLocaleString()}</small>
    </div>
  );
}
