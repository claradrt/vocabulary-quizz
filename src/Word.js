import React from "react";
import "./Word.css";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

export default function Word(props) {
  const handleChange = (event) => {
    if (event.target.checked) {
      props.wordIsSelected(props.wordObject.id);
    } else {
      props.wordIsUnselected(props.wordObject.id);
    }
  };

  return (
    <div className="word-wrapper">
      <div className="row justify-content-center">
        <div className="col-5 text-break">
          <div className="word text-capitalize">{props.wordObject.word}</div>
          <div className="meaning text-capitalize">
            {props.wordObject.meaning}
          </div>
        </div>
        <div className="col-6 text-center align-self-center">
          <span className="answer-count">
            {" "}
            <span className="answer-count-text">Correct answer count: </span>
            <strong>{props.wordObject.correctAnwserCount}</strong>
            <div className="tooltips">
              <span className="question-icon">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
              <span className="tooltiptext">
                This is the number of times you guessed that word right in the
                quiz
              </span>
            </div>
          </span>
        </div>
        <div className="checkbox-wrapper col-1 align-self-center pe-3">
          <label className="checkbox">
            <Checkbox checked={props.checked} onChange={handleChange} />
          </label>
        </div>
      </div>
    </div>
  );
}
