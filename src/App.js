import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import VocabularyTest from "./routes/vocabulary-test";
import Vocabulary from "./routes/vocabulary-list";
import NavBar from "./NavBar.js";
import Footer from "./Footer";

import "./Variables.css";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/home" element={<VocabularyTest />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
          </Routes>
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}
