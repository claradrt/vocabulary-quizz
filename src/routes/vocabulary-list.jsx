import React, { useState } from "react";
import Word from "../Word";
import AddWord from "../AddWord";

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

  function deleteWord(wordIndex) {
    setTimeout(() => {
      vocabularyList.splice(wordIndex, 1);
      setVocabularyList([...vocabularyList]);
      localStorage.setItem(
        "storedVocabularyList",
        JSON.stringify(vocabularyList)
      );
    }, 500);
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
      {vocabularyList &&
        vocabularyList.map((wordObject, index) => {
          return (
            <div key={index}>
              <Word
                meaning={wordObject.meaning}
                word={wordObject.word}
                wordIndex={index}
                deleteWord={deleteWord}
              />
            </div>
          );
        })}
    </div>
  );
}
