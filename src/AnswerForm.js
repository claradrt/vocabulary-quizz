import React, { useState } from "react";
import "./AnswerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function AnswerForm(props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  function displayAnswer() {
    setShowAnswer(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let input = event.target[0].value;
    input = input.toLowerCase();
    if (input === props.answer.toLowerCase()) {
      setAnswerCorrect(true);
      props.addPointToScore();
      setTimeout(() => {
        setAnswerCorrect(false);
        props.newWordToTranslate();
        event.target[0].value = "";
      }, 1000);
    } else {
      alert("Answer incorrect");
    }
  }

  function nextWord() {
    props.newWordToTranslate();
    setShowAnswer(false);
  }

  return (
    <form className="AnswerForm" onSubmit={handleSubmit}>
      {showAnswer || (
        <div>
          <input type="text" placeholder="type answer..." />
          {answerCorrect || <button type="submit">Submit</button>}
          {answerCorrect && (
            <span className="check-icon">
              <FontAwesomeIcon icon={faCheck} color="green" />
            </span>
          )}
          <div className="answer-reveal" onClick={displayAnswer}>
            See answer
          </div>
        </div>
      )}
      {showAnswer && <span className="answer">{props.answer}</span>}
      {showAnswer && (
        <div className="next-word-btn" onClick={nextWord}>
          Next word
        </div>
      )}
    </form>
  );
}
