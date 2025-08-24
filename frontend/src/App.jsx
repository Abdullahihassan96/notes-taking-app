import { Routes, Route, Link } from "react-router-dom";
import NotesPage from "./pages/NotesPage.jsx";

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="brand">Notes Taking App </div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<NotesPage />} />
      </Routes>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Abdullahi Hussein. All rights
        reserved. 🚀
      </footer>
    </div>
  );
}
