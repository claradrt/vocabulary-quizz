import React, { useState } from "react";
import Word from "../Word";
import AddWord from "../AddWord";
import VocabularyListOptions from "../VocabularyListOptions";

import "../VocabularyList.css";

export default function Vocabulary() {
  const [vocabularyList, setVocabularyList] = useState(() => {
    return getListFromLocalStorage();
  });
  const [selectedWordsIds, setSelectedWordsIds] = useState([]);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [parentCheckboxState, setParentCheckboxState] = useState({
    checked: false,
    indeterminate: false,
  });
  const [showAddWordForm, setShowAddWordForm] = useState(false);
  const [sortingOrder, setSortingOrder] = useState(null);

  function getListFromLocalStorage() {
    const savedVocabularyList = localStorage.getItem("storedVocabularyList");
    const initialValue = JSON.parse(savedVocabularyList);
    return initialValue || [];
  }

  function updateParentCheckboxStatus(checked, indeterminate) {
    const checkboxStatus = { ...parentCheckboxState };
    checkboxStatus.checked = checked;
    checkboxStatus.indeterminate = indeterminate;
    setParentCheckboxState(checkboxStatus);
  }

  function deleteSelection() {
    let arrayOfIds = [...selectedWordsIds];
    let vocabList = getListFromLocalStorage();
    setTimeout(() => {
      arrayOfIds.forEach((wordId) => {
        const isSameId = (word) => word.id === wordId;
        let wordIndex = vocabList.findIndex(isSameId);
        vocabList.splice(wordIndex, 1);
      });
      localStorage.setItem("storedVocabularyList", JSON.stringify(vocabList));
      setSelectedWordsIds([]);
      setShowDeleteOption(false);
      updateParentCheckboxStatus(false, false);
      if (vocabList.length === 0) {
        setSortingOrder(null);
        orderVocabularyList(null);
      } else {
        orderVocabularyList(sortingOrder);
      }
    }, 500);
  }

  function addNewWord(word) {
    vocabularyList.unshift(word);
    setVocabularyList([...vocabularyList]);
    localStorage.setItem(
      "storedVocabularyList",
      JSON.stringify(vocabularyList)
    );
    orderVocabularyList(sortingOrder);
  }

  function handleClick() {
    setShowAddWordForm(true);
  }

  function wordIsSelected(wordId) {
    let wordIds = [...selectedWordsIds];
    wordIds.push(wordId);
    setSelectedWordsIds(wordIds);
    setShowDeleteOption(true);
    if (wordIds.length === vocabularyList.length) {
      updateParentCheckboxStatus(true, false);
    } else {
      updateParentCheckboxStatus(false, true);
    }
  }

  function wordIsUnselected(wordId) {
    let wordIds = [...selectedWordsIds];
    let index = wordIds.indexOf(wordId);
    wordIds.splice(index, 1);
    setSelectedWordsIds(wordIds);
    if (wordIds.length === 0) {
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
    let vocabList = getListFromLocalStorage();
    let array = [];
    for (let word of vocabList) {
      array.push(word.id);
    }
    setSelectedWordsIds(array);
  }

  function uncheckAllCheckboxes() {
    setSelectedWordsIds([]);
  }

  function hideAddWordForm() {
    setShowAddWordForm(false);
  }

  function sortVocabularyListFromAToZ() {
    let list = getListFromLocalStorage();
    list.sort(function (a, b) {
      var wordA = a.word.toUpperCase();
      var wordB = b.word.toUpperCase();
      wordA = wordA.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      wordB = wordB.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (wordA < wordB) {
        return -1;
      }
      if (wordA > wordB) {
        return 1;
      }
      return 0;
    });
    setVocabularyList(list);
    return list;
  }

  function sortVocabularyListFromZToA() {
    let list = sortVocabularyListFromAToZ();
    list = list.reverse();
    setVocabularyList(list);
    return list;
  }

  function sortVocabularyListFromMostRecent() {
    const vocabList = getListFromLocalStorage();
    setVocabularyList(vocabList);
    return vocabList;
  }

  function sortVocabularyListFromOldest() {
    const vocabList = sortVocabularyListFromMostRecent().reverse();
    setVocabularyList(vocabList);
    return vocabList;
  }

  function sortVocabularyListFromHighestScore() {
    let list = getListFromLocalStorage();
    list.sort(function (a, b) {
      return b.correctAnwserCount - a.correctAnwserCount;
    });
    setVocabularyList(list);
    return list;
  }

  function sortVocabularyListFromLowestScore() {
    const list = sortVocabularyListFromHighestScore().reverse();
    setVocabularyList(list);
    return list;
  }

  function orderVocabularyList(selectedOption) {
    let functionMapping = {
      1: sortVocabularyListFromMostRecent,
      2: sortVocabularyListFromOldest,
      3: sortVocabularyListFromAToZ,
      4: sortVocabularyListFromZToA,
      5: sortVocabularyListFromHighestScore,
      6: sortVocabularyListFromLowestScore,
    };
    setSortingOrder(selectedOption);
    if (selectedOption !== null) {
      functionMapping[selectedOption]();
    }
  }

  return (
    <div className="Vocabulary">
      <h2 className="mt-2 text-center">Vocabulary List</h2>
      <p className="total-of-words d-inline-block mx-auto mt-3">
        You currently have <strong>{vocabularyList.length} words</strong> in
        your vocabulary list.
      </p>
      <div id="add-word-form">
        {showAddWordForm && (
          <AddWord addNewWord={addNewWord} hideForm={hideAddWordForm} />
        )}
        {showAddWordForm || (
          <div
            className="text-center mt-3 add-word-wrapper"
            onClick={handleClick}
          >
            +Add new word
          </div>
        )}
      </div>
      {vocabularyList.length !== 0 && (
        <VocabularyListOptions
          showDeleteOption={showDeleteOption}
          parentCheckboxState={parentCheckboxState}
          handleChange={handleParentCheckboxChange}
          deleteSelection={deleteSelection}
          orderVocabularyList={orderVocabularyList}
        />
      )}
      {vocabularyList &&
        vocabularyList.map((wordObject, index) => {
          let checked;
          if (selectedWordsIds.includes(wordObject.id)) {
            checked = true;
          } else {
            checked = false;
          }
          return (
            <div key={index}>
              <Word
                wordObject={wordObject}
                checked={checked}
                wordIsSelected={wordIsSelected}
                wordIsUnselected={wordIsUnselected}
              />
            </div>
          );
        })}
    </div>
  );
}
