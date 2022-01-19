import React, { useState, useEffect } from "react";

import ShowAnswer from "./ShowAnswer";

import "./AnswerForm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faEye } from "@fortawesome/free-solid-svg-icons";

export default function AnswerForm(props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("no-answer");
  const [disabled, setDisabled] = useState(false);

  const textInput = React.createRef();

  const statusMapping = {
    noAnswer: "no-answer",
    correctAnswer: "correct-answer",
    incorrectAnswer: "incorrect-answer",
  };

  const answerStatusRendering = {
    [statusMapping.noAnswer]: (
      <button className="submit-btn" type="submit">
        <span>↲</span>
      </button>
    ),
    [statusMapping.correctAnswer]: (
      <span className="check-icon">
        <FontAwesomeIcon icon={faCheck} color="green" />
      </span>
    ),
    [statusMapping.incorrectAnswer]: (
      <span className="check-icon">
        <FontAwesomeIcon icon={faTimes} color="#ad2831" />
      </span>
    ),
  };

  const btnContent = () => {
    if (props.remaining > 0) {
      return "Next word";
    } else {
      return "Finish";
    }
  };

  useEffect(() => {
    if (textInput.current !== null) {
      textInput.current.focus();
    }
  }, [disabled, textInput]);

  function displayAnswer() {
    setShowAnswer(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    let input = event.target[0].value;
    input = input.toLowerCase();
    if (input === props.question.answer.toLowerCase()) {
      handleCorrectAnswer(event);
    } else {
      handleIncorrectAnswer();
    }
  }

  function handleCorrectAnswer(event) {
    setAnswerStatus(statusMapping.correctAnswer);
    props.wordIsGuessed(props.question.wordId);
    setTimeout(() => {
      setAnswerStatus(statusMapping.noAnswer);
      setDisabled(false);
      props.newWordToTranslate();
      event.target[0].value = "";
      props.addPointToScore();
    }, 1000);
  }

  function handleIncorrectAnswer() {
    setAnswerStatus(statusMapping.incorrectAnswer);
    setTimeout(() => {
      setAnswerStatus(statusMapping.noAnswer);
      setDisabled(false);
      setShowAnswer(true);
    }, 2000);
  }

  function nextWord() {
    props.newWordToTranslate();
    setShowAnswer(false);
  }

  return (
    <form className="AnswerForm" onSubmit={handleSubmit}>
      {showAnswer || (
        <div className="align-items-center">
          <input
            className="answer-input"
            type="text"
            placeholder="type answer..."
            disabled={disabled ? "disabled" : ""}
            autoFocus
            ref={textInput}
          />
          {answerStatusRendering[answerStatus]}
          <div className="answer-reveal" onClick={displayAnswer}>
            <FontAwesomeIcon icon={faEye} />{" "}
            <p className="d-inline-block">See answer</p>
          </div>
        </div>
      )}
      {showAnswer && (
        <ShowAnswer
          answer={props.question.answer}
          nextWord={nextWord}
          btnContent={btnContent()}
        />
      )}
    </form>
  );
}
