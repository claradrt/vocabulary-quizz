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
    setTimeout(() => {
      vocabularyList.splice(wordIndex, 1);
      setVocabularyList([...vocabularyList]);
      localStorage.setItem(
        "storedVocabularyList",
        JSON.stringify(vocabularyList)
      );
    }, 500);
  }

  return (
    <div className="Vocabulary">
      <div className="row my-3 justify-content-center">
        <span className="col-1"></span>
      </div>
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
      <div>
        {" "}
        <AddWord addNewWord={addNewWord} />
      </div>
    </div>
  );
}
