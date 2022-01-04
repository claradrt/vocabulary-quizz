import React from "react";
import "./Word.css";

export default function Word(props) {
  return (
    <div className="col-6">
      <div className="word text-capitalize">{props.word}</div>
      <div className="meaning text-capitalize">{props.meaning}</div>
    </div>
  );
}
