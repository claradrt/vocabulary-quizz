import React from "react";
import "./Word.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export default function Word(props) {
  function handleWordDelete() {
    props.deleteWord(props.wordIndex);
  }

  return (
    <div className="border word-wrapper">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="word text-capitalize">{props.word}</div>
          <div className="meaning text-capitalize">{props.meaning}</div>
        </div>
        <div className="delete col-6 align-self-center px-5">
          <FontAwesomeIcon
            icon={faTrashAlt}
            color="red"
            onClick={handleWordDelete}
          />
        </div>
      </div>
    </div>
  );
}
