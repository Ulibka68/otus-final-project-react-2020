import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Brightness1OutlinedIcon from "@material-ui/icons/Brightness1Outlined";
import ListItemText from "@material-ui/core/ListItemText";

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

export function SelectedListItem({
  dataItems,
  handleParent,
}: tSelectedListItemProp) {
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
