import React from "react";

import "./Score.css";

export default function Score(props) {
  return (
    <div className="Score d-inline-block mb-5">
      <h1>
        Score: {props.score} / {props.total - (props.remaining + 1)}
      </h1>
      {props.remaining > 0 && (
        <p className="remaining">
          {props.remaining} more questions after that!
        </p>
      )}
      {props.remaining <= 0 && (
        <p className="remaining">No more questions after that!</p>
      )}
    </div>
  );
}
