import React from "react";
import Word from "../Word";

export default function Vocabulary() {
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
      <div>Add new word</div>
    </div>
  );
}
