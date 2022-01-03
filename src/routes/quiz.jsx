import React, { useState } from "react";

import StartQuiz from "../StartQuiz.js";
import QuizButton from "../QuizButton.js";

import { NavLink } from "react-router-dom";

export default function Quiz() {
  const [showButton, setShowButton] = useState(true);
  const [total, setTotal] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialList = JSON.parse(savedVocabularyList);
    if (initialList) {
      return initialList.length;
    } else {
      return 0;
    }
  });

  function startGame() {
    setShowButton(false);
    setTotal(total);
  }

  function gameIsFinished() {
    setShowButton(true);
  }

  if (total === 0) {
    return (
      <div className="instructions text-center mt-5">
        <h2>Welcome to your own vocabulary quiz application!</h2>
        <div className="mb-5">
          <br />
          This application was conceived for people who are studying a new
          language and are trying to learn some vocabulary. <br /> <br />
          Create your own vocabulary list by clicking on the button below and
          come back to this section to get tested on your knowledge!
        </div>

        <NavLink to="/vocabulary">Add words to my vocabulary list</NavLink>
      </div>
    );
  } else {
    return (
      <div className="text-center mt-5">
        {showButton && <QuizButton startGame={startGame} />}
        {showButton || (
          <StartQuiz gameIsFinished={gameIsFinished} total={total} />
        )}
      </div>
    );
  }
}
