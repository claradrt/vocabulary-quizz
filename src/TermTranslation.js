import React from "react";
import "./TermTranslation.css";
import AnswerForm from "./AnswerForm";

export default function TermTranslation(props) {
  if (props.meaning === "") {
    return (
      <div className="TermTranslation">
        <div className="row justify-content-center gx-1">
          <div className="col-sm">
            <h2>Word</h2>
            <div className="wordToTranslate">{props.word}</div>
          </div>
          <div className="col-sm">
            <h2>Meaning</h2>
            <AnswerForm
              answer={props.answer}
              newWordToTranslate={props.newWordToTranslate}
              addPointToScore={props.addPointToScore}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="TermTranslation">
        <div className=" row justify-content-center gx-1">
          <div className="col-sm">
            <h2>Word</h2>
            <AnswerForm
              answer={props.answer}
              newWordToTranslate={props.newWordToTranslate}
              addPointToScore={props.addPointToScore}
            />
          </div>
          <div className="col-sm">
            <h2>Meaning</h2>
            <div className="wordToTranslate">{props.meaning}</div>
          </div>
        </div>
      </div>
    );
  }
}
