# Notes App 📝

Create, edit, search, and delete notes — with data stored locally in a JSON file.

## ✨ Features

- **Create Notes** – Add new notes with a title and text
- **Edit Notes** – Open and update any existing note
- **Search Notes** – Quickly find notes by title or content
- **Delete Notes** – Remove notes, with deleted note info retained permanently for reference
- **Persistent Storage** – Notes are saved locally in a JSON file via a lightweight Node.js HTTP server
- **Smooth Animations** – Note open/close transitions powered by Framer Motion

## 🛠️ Stack

- **React** – UI components and state management
- **Vite** – Build tool and dev server
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Animated note open/close transitions
- **Node.js HTTP Server** (no framework) – Serves and persists notes data as JSON

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/roankraj/Notes-App.git
   cd Notes-App
   ```
2. Start the backend server
   ```bash
   node index.js
   ```
3. In a separate terminal, install and run the frontend
   ```bash
   cd my-react-app
   npm install
   npm run dev
   ```

## 📂 Project Structure

```
Notes-App/
├── data/
│   ├── notes.json
│   └── delete-id.json
├── my-react-app/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Header.jsx
│   │   ├── Note.jsx
│   │   ├── NoteCard.jsx
│   │   ├── Notes.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── README.md
├── index.js
└── package.json
```

## 🔌 API Endpoints

The backend runs on `http://127.0.0.1:8000` and accepts requests from `http://localhost:5173` (the Vite dev server).

| Method | Endpoint          | Description                                                          |
| ------ | ----------------- | -------------------------------------------------------------------- |
| `GET`  | `/api/home`       | Fetch all current notes from `data/notes.json`                       |
| `GET`  | `/api/deleteList` | Fetch permanently stored deleted-note IDs from `data/delete-id.json` |
| `POST` | `/add-note`       | Add a new note (expects `{ id, title, text }` in the request body)   |
| `POST` | `/edit-note`      | Edit an existing note by ID (expects `{ id, title, text }`)          |
| `POST` | `/remove-note`    | Delete a note by ID, permanently logging its ID (expects `{ id }`)   |

## 📌 Purpose

This project was built as a personal project to practice full-stack basics — connecting a React frontend to a custom Node.js backend for persistent local data storage, without relying on a backend framework.
