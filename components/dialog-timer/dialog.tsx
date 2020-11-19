import React, { useRef } from "react";
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

function FormDialog(props: PropsFromRedux) {
  const [open, setOpen] = React.useState(false);
  const refSlidwer = useRef(props.timer_next_state_second);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const sliderValueChanged = (event: object, value: number) => {
    refSlidwer.current = value;
  };

  function handleSetInterval() {
    // console.log(refSlidwer.current);
    props.setTimerInterval({ timerInteraval: refSlidwer.current });
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Задать значение интервала таймера
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Задать значение интервала таймера
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Установите значения таймера для показа следующего состояния
          </DialogContentText>
          <CustomizedSlider
            onChange={sliderValueChanged}
            defaultValue={props.timer_next_state_second}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handleSetInterval} color="primary">
            Установить интервал
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const connector = connect((state: LifeGameRootState) => state.lifeState, {
  setTimerInterval: life.setTimerInterval,
});

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

const FormDialogRedux = connector(FormDialog);

// eslint-disable-next-line no-restricted-syntax
export default FormDialogRedux;
