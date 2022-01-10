import React from "react";

import DeleteModal from "./DeleteModal";

import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function VocabularyListOptions(props) {
  const [openModal, setOpenModal] = React.useState(false);

  function onClick() {
    setOpenModal(true);
  }

  function handleClose() {
    setOpenModal(false);
  }

  function handleDelete() {
    props.deleteSelection();
    setOpenModal(false);
  }

  return (
    <div className="icon-wrapper">
      <div className="row justify-content-center">
        <div className="col-6"></div>
        <div className="col-6 pe-3">
          {props.showDeleteOption && (
            <span className="delete-wrapper">
              <button
                type="button"
                className="delete-icon"
                onClick={onClick}
                title="Delete selection"
              >
                <FontAwesomeIcon icon={faTrash} color="#4A4A4B" />
              </button>
            </span>
          )}
          <Checkbox
            checked={props.parentCheckboxState.checked}
            indeterminate={props.parentCheckboxState.indeterminate}
            onChange={props.handleChange}
          />
        </div>
      </div>
      <DeleteModal
        open={openModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </div>
  );
}