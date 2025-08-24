import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'
import NoteForm from '../components/NoteForm'
import NoteItem from '../components/NoteItem'

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')
  const [editing, setEditing] = useState(null)

  async function fetchNotes(params = {}) {
    setLoading(true)
    try {
      const res = await api.get('/api/notes', { params })
      setNotes(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  async function addNote(data) {
    const res = await api.post('/api/notes', data)
    setNotes(prev => [res.data, ...prev])
  }

  async function updateNote(id, data) {
    const res = await api.put(`/api/notes/${id}`, data)
    setNotes(prev => prev.map(n => n._id === id ? res.data : n))
  }

  async function deleteNote(id) {
    await api.delete(`/api/notes/${id}`)
    setNotes(prev => prev.filter(n => n._id !== id))
  }

  async function togglePin(note) {
    const res = await api.put(`/api/notes/${note._id}`, { pinned: !note.pinned })
    setNotes(prev => prev.map(n => n._id === note._id ? res.data : n))
  }

  function handleSearch() {
    fetchNotes({ q, tag })
  }

  const sorted = useMemo(() => {
    // Pinned first, then by updatedAt desc
    return [...notes].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
  }, [notes])

  return (
    <div>
      <NoteForm onSubmit={editing ? (data)=>{ updateNote(editing._id, data); setEditing(null) } : addNote} initial={editing} />

      <div className="searchbar">
        <input className="input" placeholder="Search..." value={q} onChange={(e)=>setQ(e.target.value)} />
        <input className="input" placeholder="Filter by tag (exact)" value={tag} onChange={(e)=>setTag(e.target.value)} />
        <button className="button" onClick={handleSearch}>Search</button>
        <button className="button" onClick={()=>{ setQ(''); setTag(''); fetchNotes() }}>Reset</button>
      </div>

      {loading ? <div className="card">Loading...</div> : (
        <div className="note-list">
          {sorted.map(n => (
            <NoteItem
              key={n._id}
              note={n}
              onEdit={setEditing}
              onDelete={deleteNote}
              onTogglePin={togglePin}
            />
          ))}
          {sorted.length === 0 && <div className="card">No notes yet</div>}
        </div>
      )}
    </div>
  )
}
