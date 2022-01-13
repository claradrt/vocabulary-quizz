import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import VocabularyTest from "./routes/vocabulary-test";
import Vocabulary from "./routes/vocabulary-list";
import NavBar from "./NavBar.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./Variables.css";

export default function App() {
  return (
    <div className=" App">
      <HashRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/home" element={<VocabularyTest />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
          </Routes>
        </div>
        <footer className="text-center mt-4">
          {" "}
          <i>
            <FontAwesomeIcon icon={faGithub} />
          </i>
          <a
            href="https://github.com/claradrt/vocabulary-quizz"
            target="_blank"
          >
            Open source code
          </a>{" "}
          by{" "}
          <a
            href="https://vigilant-hypatia-9bacdb.netlify.app/index.html"
            target="_blank"
          >
            Clara Dérot
          </a>
        </footer>
      </HashRouter>
    </div>
  );
}
