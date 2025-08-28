# MERN Notes — Backend

Express + MongoDB API for a simple notes app.

## Endpoints

- `GET /api/health` — service health
- `GET /api/notes` — list notes (query: `q`, `tag`, `pinned=true|false`)
- `POST /api/notes` — create note (`title`, `content?`, `tags?`, `pinned?`)
- `GET /api/notes/:id` — get one
- `PUT /api/notes/:id` — update
- `DELETE /api/notes/:id` — remove

## Setup

```bash
cd backend

# edit .env to add your Mongo connection
npm install
npm run dev
```
