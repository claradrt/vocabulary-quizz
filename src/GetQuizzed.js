import React, { useState } from "react";
import "./GetQuizzed.css";
import TermTranslation from "./TermTranslation.js";

export default function GetQuizzed() {
  const [vocabularyList, setVocabularyList] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  });

  const [showButton, setShowButton] = useState(true);
  const [wordToTranslate, setWordToTranslate] = useState("");
  const [meaningToTranslate, setMeaningToTranslate] = useState("");
  const [answer, setAnswer] = useState("");

  function startGame() {
    setShowButton(false);
    if (vocabularyList.length !== 0) {
      newWordToTranslate();
    } else {
      alert("Please add words in your vocabulary list");
    }
  }

  function newWordToTranslate() {
    if (vocabularyList.length !== 0) {
      const attributes = ["word", "meaning"];
      let randomAttributeIndex = Math.floor(Math.random() * 2);
      let randomTermIndex = Math.floor(Math.random() * vocabularyList.length);
      if (attributes[randomAttributeIndex] === "word") {
        setMeaningToTranslate("");
        setWordToTranslate(vocabularyList[randomTermIndex].word);
        setAnswer(vocabularyList[randomTermIndex].meaning);
      } else {
        setWordToTranslate("");
        setMeaningToTranslate(vocabularyList[randomTermIndex].meaning);
        setAnswer(vocabularyList[randomTermIndex].word);
      }
    } else {
      alert("There are no more words to guess");
    }
  }

  return (
    <div className="text-center">
      <div className="instructions text-center mb-5">
        Click on the button below to get tested on your vocabulary list!
      </div>
      {showButton && (
        <button className="get-quizzed-btn rounded" onClick={startGame}>
          Get quizzed!
        </button>
      )}
      {(wordToTranslate || meaningToTranslate) && (
        <TermTranslation
          word={wordToTranslate}
          meaning={meaningToTranslate}
          answer={answer}
          newWordToTranslate={newWordToTranslate}
        />
      )}
    </div>
  );
}
