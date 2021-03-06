import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function StartTestModal(props) {
  const buildListOfOptions = () => {
    let array = [];
    array.push({
      value: props.totalOfWords,
      label: `${props.totalOfWords} (All)`,
    });
    if (props.totalOfWords <= 5) {
      for (var i = 1; i < props.totalOfWords; i++) {
        array.push({ value: i, label: `${i}` });
      }
    } else {
      for (var j = 5; j < props.totalOfWords; j += 5) {
        array.push({ value: j, label: `${j}` });
      }
    }
    return array;
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [listOfOptions] = useState(() => {
    return buildListOfOptions();
  });
  const [selectedOption, setSelectedOption] = useState(listOfOptions[0].value);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
      component={"span"}
    >
      <DialogTitle id="responsive-dialog-title">
        How many words do you want to be tested on?
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="span">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            label="Age"
            onChange={(event) => {
              setSelectedOption(event.target.value);
              props.setNumberOfQuestions(event.target.value);
              console.log("Selected:", event.target.value);
            }}
          >
            {listOfOptions.map((option, index) => {
              return (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={props.confirmAction} autoFocus variant="contained">
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
