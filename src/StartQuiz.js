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
  const [question, setQuestion] = useState({});
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
      let questionObject;
      if (attributes[randomAttributeIndex] === "word") {
        questionObject = {
          wordToTranslate: vocabularyList[randomTermIndex].word,
          meaningToTranslate: "",
          answer: vocabularyList[randomTermIndex].meaning,
        };
      } else {
        questionObject = {
          wordToTranslate: "",
          meaningToTranslate: vocabularyList[randomTermIndex].meaning,
          answer: vocabularyList[randomTermIndex].word,
        };
      }
      setQuestion(questionObject);
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
      <TermTranslation
        word={question.wordToTranslate}
        meaning={question.meaningToTranslate}
        answer={question.answer}
        newWordToTranslate={newWordToTranslate}
        addPointToScore={addPointToScore}
      />
    </div>
  );
}
