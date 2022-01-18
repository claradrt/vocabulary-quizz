import React, { useState, useEffect, useCallback } from "react";

import Question from "./Question.js";
import Score from "./Score.js";
import ConfirmationModal from "./ConfirmationModal.js";

import "./Quiz.css";

export default function Quiz(props) {
  function getVocabularyListFromLocalStorage() {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  }

  const [vocabularyList, setVocabularyList] = useState(() => {
    const wordsForQuiz = getRandomElementsFromArray(
      getVocabularyListFromLocalStorage(),
      props.numberOfQuestions
    );
    return wordsForQuiz || [];
  });
  const [question, setQuestion] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [totalOfRemainingQuestions, setTotalOfRemainingQuestions] = useState(
    props.numberOfQuestions
  );
  const [idsOfWordsGuessed, setIdsOfWordsGuessed] = useState([]);

  function wordIsGuessed(id) {
    let array = [...idsOfWordsGuessed];
    array.push(id);
    setIdsOfWordsGuessed(array);
    console.log(array);
  }

  function getRandomElementsFromArray(array, n) {
    let copyOfArray = array.slice(0);
    let newArray = [];
    for (var i = 0; i < n; i++) {
      let randomIndex = Math.floor(Math.random() * copyOfArray.length);
      let element = copyOfArray[randomIndex];
      newArray.push(element);
      copyOfArray.splice(randomIndex, 1);
    }
    return newArray;
  }

  function randomAttribute() {
    const attributes = { 1: "word", 2: "meaning" };
    let randomAttribute = attributes[Math.floor(Math.random() * 2)];
    return randomAttribute;
  }

  function buildQuestion(word, meaning, answer, id) {
    let questionObject = {
      wordToTranslate: word,
      meaningToTranslate: meaning,
      answer: answer,
      wordId: id,
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
          vocabularyList[randomTermIndex].meaning,
          vocabularyList[randomTermIndex].id
        );
      } else {
        questionObject = buildQuestion(
          "",
          vocabularyList[randomTermIndex].meaning,
          vocabularyList[randomTermIndex].word,
          vocabularyList[randomTermIndex].id
        );
      }
      console.log(questionObject);
      setQuestion(questionObject);
      vocabularyList.splice(randomTermIndex, 1);
      setVocabularyList(vocabularyList);
      setTotalOfRemainingQuestions(vocabularyList.length);
    } else {
      props.gameIsFinished();
      setTotalOfRemainingQuestions(-1);
      let array = getVocabularyListFromLocalStorage();
      idsOfWordsGuessed.forEach((id) => {
        const indexOfCorrespondingWord = array.findIndex(
          (word) => word.id === id
        );
        array[indexOfCorrespondingWord].correctAnwserCount++;
      });

      localStorage.setItem("storedVocabularyList", JSON.stringify(array));
      setIdsOfWordsGuessed([]);
    }
  }, [props, vocabularyList, idsOfWordsGuessed]);

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
        score={props.score}
        remaining={totalOfRemainingQuestions}
      />

      <Question
        questionObject={question}
        remaining={totalOfRemainingQuestions}
        newWordToTranslate={newWordToTranslate}
        addPointToScore={props.addPointToScore}
        wordIsGuessed={wordIsGuessed}
      />
      <button
        className="close-quiz-btn mt-5"
        title="Stop quiz"
        onClick={onClick}
      >
        Stop quiz
      </button>
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
    </div>
  );
}
