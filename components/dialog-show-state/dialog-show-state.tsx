import React, { ChangeEvent, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Brightness1OutlinedIcon from "@material-ui/icons/Brightness1Outlined";

import { connect, ConnectedProps } from "react-redux";
import { LifeGameRootState } from "@redux/store";
import * as life from "components/Life/life_reducer";
import * as show from "components/dialog-show-state/dialog-show-state-reduser";
import { SelectedListItem } from "./SelectedListItem";

// Для тестирования компонента
// import test_answer from "./sqlList.json";

interface tUserName {
  userNameFromSeesion: string;
}

function FormDialog(props: PropsFromRedux & tUserName) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    props.stopTimer();
    props.sendQuery({ user: props.userNameFromSeesion });
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSetStateToSQL() {
    setOpen(false);
  }

  const seletedListItem = React.useRef(0);
  function handleParent(id: number) {
    seletedListItem.current = id;
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Показать сохраненные состояния
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Показать сохраненные состояния
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите комментарий для сохраненного состояния.
          </DialogContentText>

          <SelectedListItem
            dataItems={props.show.dbItems}
            handleParent={handleParent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handleSetStateToSQL} color="primary">
            Выбрать состояние
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//***************************************************************************************************
const connector = connect((state: LifeGameRootState) => state, {
  sendQuery: show.sendQuery,
  stopTimer: life.stopTimer,
});

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

const FormDialogShowRedux = connector(FormDialog);

// eslint-disable-next-line no-restricted-syntax
export default FormDialogShowRedux;
//***************************************************************************************************
