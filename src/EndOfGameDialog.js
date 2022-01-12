import * as React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function EndOfGameDialog(props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const successPurcentage = Math.floor((props.score / props.total) * 100);

  useEffect(() => {
    const successMap = [
      {
        threshold: 0,
        dialogTitle: `${successPurcentage}% of success: Well that's not ideal... 💩`,
        dialogContentText: "Go learn your vocabulary and take the test again.",
      },
      {
        threshold: 1,
        dialogTitle: `${successPurcentage}% of success: Could do better 😕`,
        dialogContentText: "Go learn your vocabulary and take the test again.",
      },
      {
        threshold: 30,
        dialogTitle: `${successPurcentage}% of success: Encouraging but needs a little more work 💪`,
        dialogContentText:
          "Why don't you review your vocabulary and take the test again?",
      },
      {
        threshold: 50,
        dialogTitle: `${successPurcentage}% of success: We're getting there, good job! 🤓`,
        dialogContentText:
          "A couple more learning sessions and you'll be fine.",
      },
      {
        threshold: 70,
        dialogTitle: `${successPurcentage}% of success: That's great, we can tell you've been working! 😉`,
        dialogContentText:
          "You can still do an extra review of the ones you missed.",
      },
      {
        threshold: 90,
        dialogTitle: `${successPurcentage}% of success: Great job! 👏`,
        dialogContentText:
          "Maybe take the quiz again and see if you can get a perfect.",
      },
      {
        threshold: 100,
        dialogTitle: `${successPurcentage}% of success: Awesome 🚀🚀🚀`,
        dialogContentText: "There's nothing left to teach you...",
      },
    ];

    for (var message of successMap.reverse()) {
      if (successPurcentage >= message.threshold) {
        setTitle(message.dialogTitle);
        setSubtitle(message.dialogContentText);
        break;
      }
    }
  }, [successPurcentage]);

  return (
    <div className="EndOfGameDialog">
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
