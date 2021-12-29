import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./AddWord.css";

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
        <div className="col-6 col-md-5 text-end">
          <input
            type="text"
            placeholder="Word..."
            className="text-center text-capitalize"
            onChange={handleWordInputChange}
            value={newWord}
            autoFocus
          />
        </div>
        <div className="col-6 col-md-5 text-start">
          <input
            type="text"
            placeholder="Meaning..."
            className="text-center text-capitalize"
            onChange={handleMeaningInputChange}
            value={newMeaning}
          />
          <div className="text-center d-inline-block">
            <button type="submit" className="align-self-center add-icon">
              <FontAwesomeIcon icon={faPlus} color="#757575" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
