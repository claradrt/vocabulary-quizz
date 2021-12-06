import React from "react";
import Word from "../Word";
import AddWord from "../AddWord";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

export default function Vocabulary() {
  function displayNewWordForm(event) {
    event.preventDefault();
    return <AddWord />;
  }

  let vocabularyList = {
    doctor: "doctor",
    nurse: "parastar",
    cook: "ashpaz",
    policeman: "police",
    lawyer: "vakil",
    accountant: "hesab-dar",
    teacher: "moalem",
    good: "khub",
    beautiful: "ziba",
    kind: "mehraban",
    smart: "bahush",
    "hard worker": "por talash",
    curious: "konj kav",
    quiet: "kam harf",
    talktative: "por harf",
    polite: "moadab",
    sensitive: "has sas",
  };
  return (
    <div className="Vocabulary">
      <div className="row my-3">
        <span className="col-2 text-center fw-bold">English</span>
        <span className="col-2 text-center fw-bold">Farsi</span>
      </div>
      {Object.keys(vocabularyList).map((wordLanguage1, index) => {
        return (
          <div key={index}>
            <Word
              wordLanguage1={wordLanguage1}
              wordLanguage2={vocabularyList[wordLanguage1]}
            />
          </div>
        );
      })}
      <div>
        {" "}
        <a href="/" onClick={displayNewWordForm}>
          {" "}
          Add new word
          <span className="px-1">
            <FontAwesomeIcon icon={faPlusSquare} color="green" />
          </span>
        </a>
      </div>
    </div>
  );
}
