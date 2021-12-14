import React, { useState } from "react";
import Word from "../Word";
import AddWord from "../AddWord";

export default function Vocabulary() {
  const [vocabularyList, setVocabularyList] = useState(() => {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  });

  function addNewWord(word) {
    vocabularyList.push(word);
    setVocabularyList([...vocabularyList]);
    localStorage.setItem(
      "storedVocabularyList",
      JSON.stringify(vocabularyList)
    );
  }

  function deleteWord(wordIndex) {
    vocabularyList.splice(wordIndex, 1);
    setVocabularyList([...vocabularyList]);
    localStorage.setItem(
      "storedVocabularyList",
      JSON.stringify(vocabularyList)
    );
  }

  return (
    <div className="Vocabulary">
      <div className="row my-3">
        <span className="col-4 text-center fw-bold">English</span>
        <span className="col-4 text-center fw-bold">Farsi</span>
      </div>
      {vocabularyList &&
        vocabularyList.map((wordObject, index) => {
          return (
            <div key={index}>
              <Word
                wordLanguage1={wordObject.wordInEnglish}
                wordLanguage2={wordObject.wordInFarsi}
                wordIndex={index}
                deleteWord={deleteWord}
              />
            </div>
          );
        })}
      <div>
        {" "}
        <AddWord addNewWord={addNewWord} />
      </div>
    </div>
  );
}
