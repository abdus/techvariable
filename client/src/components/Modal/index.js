import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  useMediaQuery,
} from "@material-ui/core/";
import { useTheme } from "@material-ui/core/styles";
import propTypes from "prop-types";

const Modal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={() => props.handler(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={() => props.handler(false)}>
            <props.actionAcceptComponent />
          </Button>
          <Button onClick={() => props.handler(false)}>
            <props.actionRejectComponent />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Modal.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.node,
  open: propTypes.bool,
  handler: propTypes.func.isRequired,
  actionAcceptComponent: propTypes.func,
  actionRejectComponent: propTypes.func,
};

export default Modal;
