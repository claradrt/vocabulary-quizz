import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Quiz from "./routes/quiz";
import Vocabulary from "./routes/vocabulary-list";
import NavBar from "./NavBar.js";

export default function App() {
  return (
    <div className="container App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
