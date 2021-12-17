import React from "react";

export default function AnswerForm(props) {
  function handleSubmit(event) {
    event.preventDefault();
    let input = event.target[0].value;
    input = input.toLowerCase();
    if (input === props.answer.toLowerCase()) {
      alert("Answer correct");
    } else {
      alert("Answer incorrect");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="type answer..." />
      <button type="submit">Submit</button>
    </form>
  );
}
