import React from "react";
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  })
);

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

interface tSliderProps {
  onChange: (e: object, value: number) => any;
  defaultValue: number;
}

export default function CustomizedSlider({
  onChange,
  defaultValue,
}: tSliderProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom>Введите время в секундах</Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="Ввелите время в 1/10 секунды"
        defaultValue={defaultValue}
        min={0.3}
        max={3}
        step={0.01}
        onChange={onChange}
      />
    </div>
  );
}
