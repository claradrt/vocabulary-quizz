import React from "react";

export default function ShowAnswer(props) {
  function handleClick() {
    props.nextWord();
  }
  return (
    <div>
      <span className="answer">{props.answer}</span>
      <div className="next-word-btn" onClick={handleClick}>
        Next word
      </div>
    </div>
  );
}
