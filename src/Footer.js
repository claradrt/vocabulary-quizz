import React from "react";

import "./Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="text-center mt-4">
      {" "}
      <i>
        <FontAwesomeIcon icon={faGithub} />
      </i>
      <a
        href="https://github.com/claradrt/vocabulary-quizz"
        target="_blank"
        rel="noreferrer"
      >
        Open source code
      </a>{" "}
      by{" "}
      <a
        href="https://vigilant-hypatia-9bacdb.netlify.app/index.html"
        target="_blank"
        rel="noreferrer"
      >
        Clara Dérot
      </a>
    </footer>
  );
}
