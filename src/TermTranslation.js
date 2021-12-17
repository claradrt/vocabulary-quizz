import React from "react";
import "./TermTranslation.css";
import AnswerForm from "./AnswerForm";

export default function TermTranslation(props) {
  if (props.meaning === "") {
    return (
      <div className="TermTranslation d-inline-flex justify-content-evenly">
        <div>
          <h2>Word</h2>
          {props.word}
        </div>
        <div>
          <h2>Meaning</h2>
          <AnswerForm
            answer={props.answer}
            newWordToTranslate={props.newWordToTranslate}
          />
        </div>
        <div className="d-none">Answer: {props.answer}</div>
      </div>
    );
  } else {
    return (
      <div className="TermTranslation d-inline-flex justify-content-evenly">
        <div>
          <h2>Word</h2>
          <AnswerForm
            answer={props.answer}
            newWordToTranslate={props.newWordToTranslate}
          />
        </div>
        <div>
          <h2>Meaning</h2>
          {props.meaning}
        </div>
        <div className="d-none">Answer: {props.answer}</div>
      </div>
    );
  }
}
