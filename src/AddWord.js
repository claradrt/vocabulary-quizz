import React, { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./AddWord.css";

export default function AddWord(props) {
  const [newMeaning, setNewMeaning] = useState("");
  const [newWord, setNewWord] = useState("");
  const inputRef = useRef();

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
    inputRef.current.focus();
  }

  function cancelForm() {
    props.hideForm();
  }

  return (
    <div className="AddWord mt-2 mx-auto">
      <form onSubmit={handleFormSubmit}>
        <div className="row my-3 gy-1 gx-1 gx-md-3 justify-content-center text-center">
          <div className="col-sm col-md-5 word-input">
            <input
              type="text"
              placeholder="Word..."
              className="text-center text-capitalize "
              onChange={handleWordInputChange}
              value={newWord}
              autoFocus
              ref={inputRef}
            />
          </div>
          <div className="col-sm col-md-5 meaning-input">
            <input
              type="text"
              placeholder="Meaning..."
              className="text-center text-capitalize"
              onChange={handleMeaningInputChange}
              value={newMeaning}
            />
          </div>
          <div className="text-center btn-wrapper col-sm col-md-2 gx-0">
            <div className="add-btn align-self-center">
              <button type="submit" title="Add word">
                <FontAwesomeIcon icon={faCheck} color="#004D00" />
              </button>
            </div>
            <div className="cancel-btn align-self-center">
              <button type="button" title="Cancel" onClick={cancelForm}>
                <FontAwesomeIcon icon={faTimes} color="#c04848" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
