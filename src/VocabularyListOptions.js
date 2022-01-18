import React, { useState } from "react";

import ConfirmationModal from "./ConfirmationModal";
import SimpleSnackbar from "./SnackBar";
import SortMenu from "./SortMenu";

import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function VocabularyListOptions(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  function onClick() {
    setOpenModal(true);
  }

  function handleModalClose() {
    setOpenModal(false);
  }

  function handleSnackbarClose() {
    setOpenSnackbar(false);
  }

  function handleDelete() {
    props.deleteSelection();
    setOpenModal(false);
    setOpenSnackbar(true);
  }

  return (
    <div className="icon-wrapper">
      <div className="row justify-content-center">
        <div className="col-2"></div>
        <div className="col-10 pe-3">
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
          <SortMenu orderVocabularyList={props.orderVocabularyList} />
          <Checkbox
            checked={props.parentCheckboxState.checked}
            indeterminate={props.parentCheckboxState.indeterminate}
            onChange={props.handleChange}
          />
        </div>
      </div>
      <ConfirmationModal
        open={openModal}
        handleClose={handleModalClose}
        confirmAction={handleDelete}
        dialogTitle="Are you sure you want to delete the selection?"
        dialogContentText="This action cannot be undone."
        confirmButtonIcon={<FontAwesomeIcon icon={faTrash} />}
        confirmButtonText="Delete"
      />
      <SimpleSnackbar open={openSnackbar} handleClose={handleSnackbarClose} />
    </div>
  );
}
