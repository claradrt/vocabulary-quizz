import React from "react";
import "./ShowAnswer.css";

export default function ShowAnswer(props) {
  function handleClick() {
    props.nextWord();
  }
  return (
    <div className="ShowAnswer">
      <span className="answer">{props.answer}</span>
      <div className="next-word-btn" onClick={handleClick}>
        Next word
      </div>
    </div>
  );
}
