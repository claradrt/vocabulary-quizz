import React from "react";
import "./TermTranslation.css";

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
          <input type="text" placeholder="type answer..." />
        </div>
        <div className="d-none">Answer: {props.answer}</div>
      </div>
    );
  } else {
    return (
      <div className="TermTranslation d-inline-flex justify-content-evenly">
        <div>
          <h2>Word</h2>
          <input type="text" placeholder="type answer..." />
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
