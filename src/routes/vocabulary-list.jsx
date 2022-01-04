import React, { useState } from "react";
import AddWord from "../AddWord";
import ListOfWords from "../ListOfWords";
import "../VocabularyList.css";

export default function Vocabulary() {
  const [vocabularyList, setVocabularyList] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  });

  const [addWord, setAddWord] = useState(false);

  function addNewWord(word) {
    vocabularyList.push(word);
    setVocabularyList([...vocabularyList]);
    localStorage.setItem(
      "storedVocabularyList",
      JSON.stringify(vocabularyList)
    );
  }

  function handleClick() {
    setAddWord(true);
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
      <ListOfWords vocabularyList={vocabularyList} />
    </div>
  );
}
