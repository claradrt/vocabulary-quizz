import React, { useState } from "react";
import "./Word.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddWord(props) {
  const [newWordEnglish, setNewWordEnglish] = useState("");
  const [newWordFarsi, setNewWordFarsi] = useState("");

  function handleFirstInputChange(event) {
    setNewWordEnglish(event.target.value);
  }

  function handleSecondInputChange(event) {
    setNewWordFarsi(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    props.addNewWord({
      wordInEnglish: newWordEnglish,
      wordInFarsi: newWordFarsi,
    });
  }

  return (
    <form className="row my-3" onSubmit={handleFormSubmit}>
      <div className="col-4">
        <input
          type="text"
          placeholder="Word in English..."
          className="word text-center text-capitalize"
          onChange={handleFirstInputChange}
        />
      </div>
      <div className="col-4">
        <input
          type="text"
          placeholder="Word in Farsi..."
          className="word text-center text-capitalize"
          onChange={handleSecondInputChange}
        />
      </div>
      <button type="submit" className="col-4 align-self-center">
        <FontAwesomeIcon icon={faPlus} color="green" className="add-icon" />
      </button>
    </form>
  );
}
