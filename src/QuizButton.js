import React from "react";

import "./QuizButton.css";

export default function QuizButton(props) {
  return (
    <div className="QuizButton">
      <div className="instructions text-center mb-5">
        Click on the button below to get tested on your vocabulary list!
      </div>
      <button
        className="btn-style-reverse get-quizzed-btn"
        onClick={() => {
          props.setOpenStartGameModal(true);
        }}
      >
        START QUIZ
      </button>
    </div>
  );
}
