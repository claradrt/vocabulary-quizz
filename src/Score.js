import React from "react";

export default function Score(props) {
  return (
    <h1 className="mb-5">
      Score: {props.score} / {props.total}
    </h1>
  );
}
