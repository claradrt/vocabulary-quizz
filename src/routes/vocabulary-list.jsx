import React, { useState } from "react";
import Word from "../Word";
import AddWord from "../AddWord";
import "../VocabularyList.css";
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

  const [addWord, setAddWord] = useState(false);

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
    selectedWordsIndex.push(wordIndex);
    setSelectedWordsIndex(selectedWordsIndex);
    console.log("Array of selected words indexes:", selectedWordsIndex);
    setShowDeleteOption(true);
  }

  function wordIsUnselected(wordIndex) {
    let index = selectedWordsIndex.indexOf(wordIndex);
    selectedWordsIndex.splice(index, 1);
    setSelectedWordsIndex(selectedWordsIndex);
    console.log("Array of selected words indexes:", selectedWordsIndex);
    if (selectedWordsIndex.length === 0) {
      setShowDeleteOption(false);
    }
  }

  return (
    <div className="Vocabulary">
      {addWord && (
        <div>
          <AddWord addNewWord={addNewWord} />
        </div>
      )}
      {addWord || (
        <div
          className="border text-center mt-3 add-word-wrapper"
          onClick={handleClick}
        >
          +Add new word
        </div>
      )}
      {vocabularyList &&
        vocabularyList.map((wordObject, index) => {
          return (
            <div key={index}>
              <Word
                meaning={wordObject.meaning}
                word={wordObject.word}
                wordIndex={index}
                wordIsSelected={wordIsSelected}
                wordIsUnselected={wordIsUnselected}
              />
            </div>
          );
        })}
    </div>
  );
}
