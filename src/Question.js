import React from "react";

import AnswerForm from "./AnswerForm";

import "./Question.css";

export default function Question(props) {
  if (props.meaning === "") {
    return (
      <div className="Question">
        <div className="row justify-content-center">
          <div className="col-sm-5 column">
            <h2>Word</h2>
            <div className="wordToTranslate">{props.word}</div>
          </div>
          <div className="col-sm-5 column">
            <h2>Meaning</h2>
            <AnswerForm
              answer={props.answer}
              newWordToTranslate={props.newWordToTranslate}
              addPointToScore={props.addPointToScore}
              decrementRemainingQuestions={props.decrementRemainingQuestions}
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
              answer={props.answer}
              newWordToTranslate={props.newWordToTranslate}
              addPointToScore={props.addPointToScore}
              decrementRemainingQuestions={props.decrementRemainingQuestions}
            />
          </div>
          <div className="col-sm-5 column">
            <h2>Meaning</h2>
            <div className="wordToTranslate">{props.meaning}</div>
          </div>
        </div>
      </div>
    );
  }
}
