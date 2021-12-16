import React, { useState } from "react";
import "./GetQuizzed.css";

export default function GetQuizzed() {
  const [vocabularyList, setVocabularyList] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  });

  function startGame() {
    if (vocabularyList.length !== 0) {
      alert("let's get it started");
    } else {
      alert("Please add words in your vocabulary list");
    }
  }

  return (
    <div>
      <div className="instructions text-center mb-5">
        Click on the button below to get tested on your vocabulary list!
      </div>
      <button className="get-quizzed-btn rounded" onClick={startGame}>
        Get quizzed!
      </button>
    </div>
  );
}
