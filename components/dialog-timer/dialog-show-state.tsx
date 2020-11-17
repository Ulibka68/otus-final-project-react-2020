import React, { ChangeEvent, useRef } from "react";
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

import test_answer from "./sqlList.json";

interface tUserName {
  userNameFromSeesion: string;
}

function FormDialog(props: PropsFromRedux & tUserName) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            dataItems={test_answer}
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

const connector = connect((state: LifeGameRootState) => state, {
  setTimerInterval: life.setTimerInterval,
  putStateToSQL: life.putStateToSQL,
});

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

const FormDialogShowRedux = connector(FormDialog);

// eslint-disable-next-line no-restricted-syntax
export default FormDialogShowRedux;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

// "insertDate": "2020-11-17T05:56:01.000Z"
type tItemState = {
  id: number;
  user: string;
  comment: string;
  insertDate: string;
};
type tSelectedListItemProp = {
  dataItems: tItemState[];
  handleParent: (keyParm: number) => any;
};

// "2020-11-17T05:56:04.000Z"
function prettierDate(d: string): string {
  const myregexp = /(.+)T(.+):\d{2}\.\d{3}Z/gi;
  return d.replace(myregexp, "$1 $2");
}

function SelectedListItem({ dataItems, handleParent }: tSelectedListItemProp) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    handleParent(dataItems[index].id);
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {dataItems.map((value, index) => (
          <ListItemCust
            keyNum={index}
            key={index}
            text={`${value.comment} : ${prettierDate(value.insertDate)}`}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
          />
        ))}
      </List>
    </div>
  );
}

type tListItemCustProps = {
  selectedIndex: number;
  keyNum: number;
  text: string;
  handleListItemClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    keyParm: number
  ) => any;
};

function ListItemCust({
  selectedIndex,
  keyNum,
  text,
  handleListItemClick,
}: tListItemCustProps) {
  return (
    <ListItem
      button
      selected={selectedIndex === keyNum}
      onClick={(event) => handleListItemClick(event, keyNum)}
    >
      <ListItemIcon>
        {selectedIndex === keyNum ? (
          <CheckCircleOutlineOutlinedIcon />
        ) : (
          <Brightness1OutlinedIcon />
        )}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}
