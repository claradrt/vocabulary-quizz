import React, { useState } from "react";
import "./AnswerForm.css";

export default function AnswerForm(props) {
  const [showAnswer, setShowAnswer] = useState(false);

  function displayAnswer() {
    setShowAnswer(true);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let input = event.target[0].value;
    input = input.toLowerCase();
    if (input === props.answer.toLowerCase()) {
      alert("Answer correct");
    } else {
      alert("Answer incorrect");
    }
    props.newWordToTranslate();
  }

  function nextWord() {
    props.newWordToTranslate();
    setShowAnswer(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {showAnswer || (
        <div>
          <input type="text" placeholder="type answer..." />
          <button type="submit">Submit</button>
          <div className="answer-reveal" onClick={displayAnswer}>
            See answer
          </div>
        </div>
      )}
      {showAnswer && <span>{props.answer}</span>}
      {showAnswer && (
        <div className="next-word-btn" onClick={nextWord}>
          Next word
        </div>
      )}
    </form>
  );
}
