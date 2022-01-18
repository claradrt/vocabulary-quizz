import React from "react";

import AnswerForm from "./AnswerForm";

import "./Question.css";

export default function Question(props) {
  if (props.questionObject.meaningToTranslate === "") {
    return (
      <div className="Question">
        <div className="row justify-content-center">
          <div className="col-sm-5 column">
            <h2>Word</h2>
            <div className="wordToTranslate text-break">
              {props.questionObject.wordToTranslate}
            </div>
          </div>
          <div className="col-sm-5 column">
            <h2>Meaning</h2>
            <AnswerForm
              question={props.questionObject}
              newWordToTranslate={props.newWordToTranslate}
              addPointToScore={props.addPointToScore}
              remaining={props.remaining}
              wordIsGuessed={props.wordIsGuessed}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Question">
        <div className="row justify-content-center">
          <div className="col-sm-5 column">
            <h2>Word</h2>
            <AnswerForm
              question={props.questionObject}
              newWordToTranslate={props.newWordToTranslate}
              addPointToScore={props.addPointToScore}
              remaining={props.remaining}
              wordIsGuessed={props.wordIsGuessed}
            />
          </div>
          <div className="col-sm-5 column">
            <h2>Meaning</h2>
            <div className="wordToTranslate text-break">
              {props.questionObject.meaningToTranslate}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
