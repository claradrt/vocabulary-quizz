import React, { useState } from "react";
import "./Word.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddWord(props) {
  const [newMeaning, setNewMeaning] = useState("");
  const [newWord, setNewWord] = useState("");

  function handleMeaningInputChange(event) {
    setNewMeaning(event.target.value);
  }

  function handleWordInputChange(event) {
    setNewWord(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (newMeaning !== "" && newWord !== "") {
      props.addNewWord({
        meaning: newMeaning,
        word: newWord,
      });
      setNewMeaning("");
      setNewWord("");
    } else {
      alert("Please make sure input fields are not empty");
    }
  }

  return (
    <div className="mt-4 AddWord mx-auto">
      <form
        className="row my-3 justify-content-center"
        onSubmit={handleFormSubmit}
      >
        <h4 className="text-center">Add new word</h4>
        <div className="col-5 text-end">
          <input
            type="text"
            placeholder="Word..."
            className="word text-center text-capitalize"
            onChange={handleWordInputChange}
            value={newWord}
          />
        </div>
        <div className="col-5 text-start">
          <input
            type="text"
            placeholder="Meaning..."
            className="word text-center text-capitalize"
            onChange={handleMeaningInputChange}
            value={newMeaning}
          />
        </div>
        <button type="submit" className="col-1 align-self-center">
          <FontAwesomeIcon icon={faPlus} color="green" className="add-icon" />
        </button>
      </form>
    </div>
  );
}
