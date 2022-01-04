import React from "react";
import "./Word.css";
import Checkbox from "@mui/material/Checkbox";

export default function Word(props) {
  const handleChange = (event) => {
    if (event.target.checked) {
      props.wordIsSelected(props.wordIndex);
    } else {
      props.wordIsUnselected(props.wordIndex);
    }
  };

  return (
    <div className="border word-wrapper">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="word text-capitalize">{props.word}</div>
          <div className="meaning text-capitalize">{props.meaning}</div>
        </div>
        <div className="checkbox-wrapper col-6 align-self-center pe-3">
          <label className="checkbox">
            <Checkbox checked={props.checked} onChange={handleChange} />
          </label>
        </div>
      </div>
    </div>
  );
}
