import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ConfirmationModal(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.dialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={props.confirmAction} autoFocus variant="contained">
            {(props.confirmButtonIcon && (
              <React.Fragment>
                <span>{props.confirmButtonIcon}</span>
                <p className="ps-2 my-0">{props.confirmButtonText}</p>
              </React.Fragment>
            )) || <p className="my-0">{props.confirmButtonText}</p>}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
