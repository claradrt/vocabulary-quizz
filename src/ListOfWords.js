import React, { useState } from "react";
import Word from "./Word";

import Checkbox from "@mui/material/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ListOfWords(props) {
  const [selectedWordsIndex, setSelectedWordsIndex] = useState([]);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [parentCheckboxState, setParentCheckboxState] = useState({
    checked: false,
    indeterminate: false,
  });
  const [checked, setChecked] = useState(parentCheckboxState);

  const handleChange2 = (event) => {
    console.log("event:", event);
    setChecked(event.target.checked);
    if (event.target.checked) {
      wordIsSelected(props.wordIndex);
    } else {
      wordIsUnselected(props.wordIndex);
    }
  };

  function updateParentCheckboxStatus(checked, indeterminate) {
    const checkboxStatus = { ...parentCheckboxState };
    checkboxStatus.checked = checked;
    checkboxStatus.indeterminate = indeterminate;
    setParentCheckboxState(checkboxStatus);
  }

  function wordIsSelected(wordIndex) {
    let wordsIndex = [...selectedWordsIndex];
    wordsIndex.push(wordIndex);
    setSelectedWordsIndex(wordsIndex);
    setShowDeleteOption(true);
    if (wordsIndex.length === props.vocabularyList.length) {
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

  /*  function deleteSelection() {
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
  */

  function handleChange1(event) {
    updateParentCheckboxStatus(event.target.checked, false);
  }

  return (
    <div>
      <div className="icon-wrapper">
        {showDeleteOption && (
          <span className="delete-wrapper">
            <span className="delete-icon">
              <FontAwesomeIcon icon={faTrash} color="#4A4A4B" />
            </span>
          </span>
        )}
        <Checkbox
          checked={parentCheckboxState.checked}
          indeterminate={parentCheckboxState.indeterminate}
          onChange={handleChange1}
        />
      </div>
      {props.vocabularyList &&
        props.vocabularyList.map((wordObject, index) => {
          return (
            <div className="border word-wrapper" key={index}>
              <div className="row justify-content-center">
                <Word meaning={wordObject.meaning} word={wordObject.word} />
                <div className="checkbox-wrapper col-6 align-self-center pe-3">
                  <label className="checkbox">
                    <Checkbox
                      checked={checked}
                      onChange={() => {
                        handleChange2(index);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
