import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Quiz from "../Quiz.js";
import QuizButton from "../QuizButton.js";
import EndOfGameDialog from "../EndOfGameDialog.js";
import StartTestModal from "../StartTestModal.js";

export default function VocabularyTest() {
  const [showButton, setShowButton] = useState(true);
  const [total] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialList = JSON.parse(savedVocabularyList);
    if (initialList) {
      return initialList.length;
    } else {
      return 0;
    }
  });
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [openStartTestModal, setOpenStartGameModal] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(total);

  const [gameEnded, setGameEnded] = useState(false);

  function addPointToScore() {
    setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
  }

  function startGame() {
    setOpenStartGameModal(false);
    setShowButton(false);
  }

  function gameIsFinished() {
    setGameEnded(true);
  }

  function stopGame() {
    setShowButton(true);
    setNumberOfCorrectAnswers(0);
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

        <NavLink to="/vocabulary" className="btn-style-reverse initial-btn">
          Add words to my vocabulary list
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="VocabularyTest text-center mt-5">
        {showButton && (
          <QuizButton setOpenStartGameModal={setOpenStartGameModal} />
        )}
        {showButton || (
          <Quiz
            gameIsFinished={gameIsFinished}
            gameIsStopped={stopGame}
            addPointToScore={addPointToScore}
            score={numberOfCorrectAnswers}
            numberOfQuestions={numberOfQuestions}
          />
        )}
        {openStartTestModal && (
          <StartTestModal
            totalOfWords={total}
            setNumberOfQuestions={setNumberOfQuestions}
            open={openStartTestModal}
            handleClose={() => {
              setOpenStartGameModal(false);
            }}
            confirmAction={startGame}
          />
        )}
        {gameEnded && (
          <EndOfGameDialog
            open={gameEnded}
            handleClose={() => {
              setShowButton(true);
              setGameEnded(false);
              setNumberOfCorrectAnswers(0);
            }}
            total={numberOfQuestions}
            score={numberOfCorrectAnswers}
          />
        )}
      </div>
    );
  }
}
