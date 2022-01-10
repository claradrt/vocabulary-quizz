import React from "react";

export default function Score(props) {
  return (
    <div className="d-inline-block">
      <h1 className="mb-5">
        Score: {props.score} / {props.total}
      </h1>
    </div>
  );
}
