import React, { useState, useEffect, useCallback } from "react";

import Question from "./Question.js";
import Score from "./Score.js";
import ConfirmationModal from "./ConfirmationModal.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Quiz(props) {
  const [vocabularyList, setVocabularyList] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  });
  const [question, setQuestion] = useState({});
  const [numberOfRightAnswers, setNumberOfRightAnswers] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [totalOfRemainingQuestions, setTotalOfRemainingQuestions] = useState(
    props.total - 1
  );

  function addPointToScore() {
    setNumberOfRightAnswers(numberOfRightAnswers + 1);
  }

  function decrementRemainingQuestions() {
    console.log("remaining:", totalOfRemainingQuestions);
    setTotalOfRemainingQuestions(totalOfRemainingQuestions - 1);
  }

  function randomAttribute() {
    const attributes = { 1: "word", 2: "meaning" };
    let randomAttribute = attributes[Math.floor(Math.random() * 2)];
    return randomAttribute;
  }

  function buildQuestion(word, meaning, answer) {
    let questionObject = {
      wordToTranslate: word,
      meaningToTranslate: meaning,
      answer: answer,
    };
    return questionObject;
  }

  const newWordToTranslate = useCallback(() => {
    if (vocabularyList.length !== 0) {
      const wordOrMeaning = randomAttribute();
      let randomTermIndex = Math.floor(Math.random() * vocabularyList.length);
      let questionObject;
      if (wordOrMeaning === "word") {
        questionObject = buildQuestion(
          vocabularyList[randomTermIndex].word,
          "",
          vocabularyList[randomTermIndex].meaning
        );
      } else {
        questionObject = buildQuestion(
          "",
          vocabularyList[randomTermIndex].meaning,
          vocabularyList[randomTermIndex].word
        );
      }
      setQuestion(questionObject);
      vocabularyList.splice(randomTermIndex, 1);
      setVocabularyList(vocabularyList);
    } else {
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

  function onClick() {
    setOpenConfirmationModal(true);
  }

  function handleClose() {
    setOpenConfirmationModal(false);
  }

  return (
    <div className="Quiz">
      <Score
        total={props.total}
        score={numberOfRightAnswers}
        remaining={totalOfRemainingQuestions}
      />
      <span className="close-quiz" title="Stop quiz" onClick={onClick}>
        <FontAwesomeIcon icon={faTimes} color="#c04848" />
      </span>
      {openConfirmationModal && (
        <ConfirmationModal
          open={openConfirmationModal}
          handleClose={handleClose}
          confirmAction={props.gameIsStopped}
          dialogTitle="Are you sure you want to stop the quiz?"
          dialogContentText="You will lose your progress"
          confirmButtonText="Stop quiz"
        />
      )}
      <Question
        word={question.wordToTranslate}
        meaning={question.meaningToTranslate}
        answer={question.answer}
        newWordToTranslate={newWordToTranslate}
        addPointToScore={addPointToScore}
        decrementRemainingQuestions={decrementRemainingQuestions}
      />
    </div>
  );
}
