import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Quiz from "./routes/quiz";
import Vocabulary from "./routes/vocabulary-list";
import NavBar from "./NavBar.js";

export default function App() {
  return (
    <div className="container App">
      <NavBar />
      <HashRouter>
        <Routes>
          <Route path="/home" element={<Quiz />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
