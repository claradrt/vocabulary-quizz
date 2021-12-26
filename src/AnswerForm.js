import React, { useState } from "react";

import ShowAnswer from "./ShowAnswer";

import "./AnswerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function AnswerForm(props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("no-answer");
  const [disabled, setDisabled] = useState(false);

  function displayAnswer() {
    setShowAnswer(true);
  }

  function handleSubmit(event) {
    setDisabled(true);
    event.preventDefault();
    let input = event.target[0].value;
    input = input.toLowerCase();
    if (input === props.answer.toLowerCase()) {
      setAnswerStatus("correct-answer");
      props.addPointToScore();
      setTimeout(() => {
        setAnswerStatus("no-answer");
        setDisabled(false);
        props.newWordToTranslate();
        event.target[0].value = "";
      }, 1000);
    } else {
      setAnswerStatus("incorrect-answer");
      setTimeout(() => {
        setAnswerStatus("no-answer");
        setDisabled(false);
        setShowAnswer(true);
      }, 2000);
    }
  }

  function nextWord() {
    props.newWordToTranslate();
    setShowAnswer(false);
  }
  const answerStatusRendering = {
    "no-answer": <button type="submit">Submit</button>,
    "correct-answer": (
      <span className="check-icon">
        <FontAwesomeIcon icon={faCheck} color="green" />
      </span>
    ),
    "incorrect-answer": (
      <span className="check-icon">
        <FontAwesomeIcon icon={faTimes} color="red" />
      </span>
    ),
  };

  return (
    <form className="AnswerForm" onSubmit={handleSubmit}>
      {showAnswer || (
        <div>
          <input
            type="text"
            placeholder="type answer..."
            disabled={disabled ? "disabled" : ""}
          />
          {answerStatusRendering[answerStatus]}
          <div className="answer-reveal" onClick={displayAnswer}>
            See answer
          </div>
        </div>
      )}
      {showAnswer && <ShowAnswer answer={props.answer} nextWord={nextWord} />}
    </form>
  );
}
