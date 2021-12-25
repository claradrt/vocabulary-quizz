import React, { useState } from "react";

import StartQuiz from "../StartQuiz.js";

import "../Quiz.css";
import QuizButton from "../QuizButton.js";

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

  function initializeGame() {
    setShowButton(true);
  }

  if (total === 0) {
    return (
      <div className="text-center mt-5">
        <div className="instructions text-center mb-5">
          You don't have any words in your vocabulary list for us to quiz you...
          To add some, go to the Vocabulary List section.
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center mt-5">
        {showButton && <QuizButton startGame={startGame} />}
        {showButton || (
          <StartQuiz initializeGame={initializeGame} total={total} />
        )}
      </div>
    );
  }
}
