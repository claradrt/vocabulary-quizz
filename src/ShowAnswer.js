import React from "react";

import "./ShowAnswer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function ShowAnswer(props) {
  function handleClick() {
    props.nextWord();
  }
  return (
    <div className="ShowAnswer">
      <span className="answer">{props.answer}</span>
      <div className="next-word-btn" onClick={handleClick}>
        <span className="next">Next word</span>
        <span className="icon">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </div>
  );
}
