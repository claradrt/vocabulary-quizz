import React from "react";
import Select from "react-select";

import "./SortMenu.css";

const options = [
  { value: 1, label: "Most recent" },
  { value: 2, label: "Oldest" },
  { value: 3, label: "A-Z" },
  { value: 4, label: "Z-A" },
  { value: 5, label: "Highest score" },
  { value: 6, label: "Lowest score" },
];

export default function SortMenu(props) {
  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#fef8f7",
        primary: "#ee7769",
      },
    };
  }

  return (
    <div className="SortMenu text-start d-inline-block">
      <Select
        theme={customTheme}
        options={options}
        onChange={(event) => {
          props.orderVocabularyList(event.value);
        }}
        placeholder="Sort by"
      />
    </div>
  );
}
