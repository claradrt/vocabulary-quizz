import React, { useState, useEffect, useCallback } from "react";
import TermTranslation from "./TermTranslation.js";
import Score from "./Score.js";

import "./Quiz.css";

export default function StartQuizz(props) {
  const [vocabularyList, setVocabularyList] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  });
  const [wordToTranslate, setWordToTranslate] = useState("");
  const [meaningToTranslate, setMeaningToTranslate] = useState("");
  const [answer, setAnswer] = useState("");
  const [numberOfRightAnswers, setNumberOfRightAnswers] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  function addPointToScore() {
    setNumberOfRightAnswers(numberOfRightAnswers + 1);
  }

  const newWordToTranslate = useCallback(() => {
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
      vocabularyList.splice(randomTermIndex, 1);
      console.log(vocabularyList);
      setVocabularyList(vocabularyList);
    } else {
      alert("There are no more words to guess");
      props.gameIsFinished();
    }
  }, [props, vocabularyList]);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    newWordToTranslate();
    setIsInitialized(true);
  }, [newWordToTranslate, isInitialized]);

  return (
    <div>
      <Score total={props.total} score={numberOfRightAnswers} />
      {(wordToTranslate || meaningToTranslate) && (
        <TermTranslation
          word={wordToTranslate}
          meaning={meaningToTranslate}
          answer={answer}
          newWordToTranslate={newWordToTranslate}
          addPointToScore={addPointToScore}
        />
      )}
    </div>
  );
}
