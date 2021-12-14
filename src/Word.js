import React from "react";
import "./Word.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export default function Word(props) {
  function handleWordDelete() {
    props.deleteWord(props.wordIndex);
  }

  return (
    <div className="row Word">
      <div className="col-4">
        <div className="word text-center text-capitalize">
          {props.wordLanguage1}
        </div>
      </div>
      <div className="col-4">
        <div className="word text-center text-capitalize">
          {props.wordLanguage2}
        </div>
      </div>
      <div className="delete col-4 align-self-center">
        <FontAwesomeIcon
          icon={faTrashAlt}
          color="red"
          onClick={handleWordDelete}
        />
      </div>
    </div>
  );
}
