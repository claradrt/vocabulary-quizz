import React, { useState } from "react";
import Word from "../Word";
import AddWord from "../AddWord";
import VocabularyListOptions from "../VocabularyListOptions";

import "../VocabularyList.css";

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
  const [showAddWordForm, setShowAddWordForm] = useState(false);

  function updateParentCheckboxStatus(checked, indeterminate) {
    const checkboxStatus = { ...parentCheckboxState };
    checkboxStatus.checked = checked;
    checkboxStatus.indeterminate = indeterminate;
    setParentCheckboxState(checkboxStatus);
  }

  function deleteSelection() {
    let arrayOfIndex = selectedWordsIndex.sort(function (a, b) {
      return b - a;
    });
    setTimeout(() => {
      for (var wordIndex of arrayOfIndex) {
        vocabularyList.splice(wordIndex, 1);
        setVocabularyList([...vocabularyList]);
        localStorage.setItem(
          "storedVocabularyList",
          JSON.stringify(vocabularyList)
        );
      }
      setSelectedWordsIndex([]);
      setShowDeleteOption(false);
      updateParentCheckboxStatus(false, false);
    }, 500);
  }

  function addNewWord(word) {
    vocabularyList.unshift(word);
    setVocabularyList([...vocabularyList]);
    localStorage.setItem(
      "storedVocabularyList",
      JSON.stringify(vocabularyList)
    );
  }

  function handleClick() {
    setShowAddWordForm(true);
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

  function handleParentCheckboxChange(event) {
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

  function hideAddWordForm() {
    setShowAddWordForm(false);
  }

  return (
    <div className="Vocabulary">
      <p className="d-inline-block mx-auto mt-3">
        You currently have {vocabularyList.length} words in your vocabulary
        list.
      </p>
      {showAddWordForm && (
        <AddWord addNewWord={addNewWord} hideForm={hideAddWordForm} />
      )}
      {showAddWordForm || (
        <div
          className="border text-center mt-3 add-word-wrapper"
          onClick={handleClick}
        >
          +Add new word
        </div>
      )}
      <VocabularyListOptions
        showDeleteOption={showDeleteOption}
        parentCheckboxState={parentCheckboxState}
        handleChange={handleParentCheckboxChange}
        deleteSelection={deleteSelection}
      />
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
