import React from "react";
import Select from "react-select";

import "./SortMenu.css";

const options = [
  { value: 1, label: "A-Z" },
  { value: 2, label: "Z-A" },
  { value: 3, label: "Most recent" },
];

export default function SortMenu(props) {
  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#c62f39",
        primary: "#c62f39",
      },
    };
  }
  return (
    <div className="dropdown d-inline-block">
      <Select
        options={options}
        onChange={(event) => {
          props.orderVocabularyList(event.value);
        }}
        placeholder="Sort by"
        theme={customTheme}
      />
    </div>
  );
}
