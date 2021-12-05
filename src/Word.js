import React from "react";
import "./Word.css";

export default function Word(props) {
  return (
    <div className="row Word">
      <div className="col-2">
        <div className="word text-center text-capitalize">
          {props.wordLanguage1}
        </div>
      </div>
      <div className="col-2">
        <div className="word text-center text-capitalize">
          {props.wordLanguage2}
        </div>
      </div>
      <div className="delete col-2 align-self-center"> X</div>
    </div>
  );
}
