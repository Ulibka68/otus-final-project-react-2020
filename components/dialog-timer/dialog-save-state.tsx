import React, { ChangeEvent, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomizedSlider from "./slider";

import { connect, ConnectedProps } from "react-redux";
import { LifeGameRootState } from "@redux/store";
import * as life from "components/Life/life_reducer";

interface tUserName {
  userNameFromSeesion: string;
}

function FormDialog(props: PropsFromRedux & tUserName) {
  const [open, setOpen] = React.useState(false);
  const refStore = useRef("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const textValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    refStore.current = event.target.value;
  };

  function handleSetStateToSQL() {
    const newState = Object.assign({}, props.lifeState);
    delete newState.neighbors;
    // JSON.stringify(newState);
    // refStore.current
    // props.userNameFromSeesion
    props.putStateToSQL({
      user: props.userNameFromSeesion,
      comment: refStore.current,
      state: newState,
    });
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Сохранить состояние игры в базе
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Сохранить состояние игры в базе
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите комментарий для сохраненного состояния.
          </DialogContentText>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="commentText"
            label="Комментарий"
            name="commentText"
            autoFocus
            onChange={textValueChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handleSetStateToSQL} color="primary">
            Сохранить состояние
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const connector = connect((state: LifeGameRootState) => state, {
  setTimerInterval: life.setTimerInterval,
  putStateToSQL: life.putStateToSQL,
});

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

const FormDialogSaveRedux = connector(FormDialog);

// eslint-disable-next-line no-restricted-syntax
export default FormDialogSaveRedux;
