import React from "react";
import "./Word.css";
import Checkbox from "@mui/material/Checkbox";

export default function Word(props) {

  return (
    <div className="border word-wrapper">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="word text-capitalize">{props.word}</div>
          <div className="meaning text-capitalize">{props.meaning}</div>
        </div>
        </div>
      </div>
    </div>
  );
}
