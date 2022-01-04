import React, { useState } from "react";
import Word from "../Word";
import AddWord from "../AddWord";
import "../VocabularyList.css";

import Checkbox from "@mui/material/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Vocabulary() {
  const [vocabularyList, setVocabularyList] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  });
  const [selectedWordsIndex, setSelectedWordsIndex] = useState([]);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [parentCheckboxState, setParentCheckboxState] = useState({
    checked: false,
    indeterminate: false,
  });
  const [addWord, setAddWord] = useState(false);

  function updateParentCheckboxStatus(checked, indeterminate) {
    const checkboxStatus = { ...parentCheckboxState };
    checkboxStatus.checked = checked;
    checkboxStatus.indeterminate = indeterminate;
    setParentCheckboxState(checkboxStatus);
  }

  function addNewWord(word) {
    vocabularyList.push(word);
    setVocabularyList([...vocabularyList]);
    localStorage.setItem(
      "storedVocabularyList",
      JSON.stringify(vocabularyList)
    );
  }

  function deleteSelection() {
    setTimeout(() => {
      for (var wordIndex of selectedWordsIndex) {
        vocabularyList.splice(wordIndex, 1);
        setVocabularyList([...vocabularyList]);
        localStorage.setItem(
          "storedVocabularyList",
          JSON.stringify(vocabularyList)
        );
      }
      setSelectedWordsIndex([]);
      setShowDeleteOption(false);
    }, 500);
  }

  function handleClick() {
    setAddWord(true);
  }

  function wordIsSelected(wordIndex) {
    let wordsIndex = [...selectedWordsIndex];
    wordsIndex.push(wordIndex);
    setSelectedWordsIndex(wordsIndex);
    setShowDeleteOption(true);
    if (wordsIndex.length === vocabularyList.length) {
      updateParentCheckboxStatus(true, false);
    } else {
      updateParentCheckboxStatus(false, true);
    }
  }

  function wordIsUnselected(wordIndex) {
    let wordsIndex = [...selectedWordsIndex];
    let index = wordsIndex.indexOf(wordIndex);
    wordsIndex.splice(index, 1);
    setSelectedWordsIndex(wordsIndex);
    if (wordsIndex.length === 0) {
      setShowDeleteOption(false);
      updateParentCheckboxStatus(false, false);
    } else {
      updateParentCheckboxStatus(false, true);
    }
  }

  function handleChange(event) {
    updateParentCheckboxStatus(event.target.checked, false);
    if (event.target.checked) {
      checkAllCheckboxes();
      setShowDeleteOption(true);
    } else {
      uncheckAllCheckboxes();
      setShowDeleteOption(false);
    }
  }

  function checkAllCheckboxes() {
    let array = [];
    for (let i = 0; i < vocabularyList.length; i++) {
      array.push(i);
    }
    setSelectedWordsIndex(array);
  }

  function uncheckAllCheckboxes() {
    setSelectedWordsIndex([]);
  }

  return (
    <div className="Vocabulary">
      {addWord && <AddWord addNewWord={addNewWord} />}
      {addWord || (
        <div
          className="border text-center mt-3 add-word-wrapper"
          onClick={handleClick}
        >
          +Add new word
        </div>
      )}
      <div className="icon-wrapper">
        <div className="row justify-content-center">
          <div className="col-6"></div>
          <div className="col-6 pe-3">
            {showDeleteOption && (
              <span className="delete-wrapper">
                <span className="delete-icon" onClick={deleteSelection}>
                  <FontAwesomeIcon icon={faTrash} color="#4A4A4B" />
                </span>
              </span>
            )}
            <Checkbox
              checked={parentCheckboxState.checked}
              indeterminate={parentCheckboxState.indeterminate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {vocabularyList &&
        vocabularyList.map((wordObject, index) => {
          let checked;
          if (selectedWordsIndex.includes(index)) {
            checked = true;
          } else {
            checked = false;
          }
          return (
            <div key={index}>
              <Word
                meaning={wordObject.meaning}
                word={wordObject.word}
                wordIndex={index}
                wordIsSelected={wordIsSelected}
                wordIsUnselected={wordIsUnselected}
                checked={checked}
              />
            </div>
          );
        })}
    </div>
  );
}
