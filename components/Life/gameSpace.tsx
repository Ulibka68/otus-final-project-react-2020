import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import * as life from "./life_reducer";
import { connect, ConnectedProps } from "react-redux";
import { LifeGameRootState } from "redux/store";

const GridWrapper = styled.div<{ sizex: number; cellSize: number }>`
  background: aqua;
  width: ${({ sizex, cellSize }) =>
    (sizex * (cellSize + 1) - 1).toString() + "px"};
`;

const GrCont = styled.div<{ sizex: number; sizey: number; cellSize: number }>`
  display: grid;

  grid-template-columns: ${({ sizex, cellSize }) =>
    `repeat(${sizex},${cellSize}px)`};
  grid-template-rows: ${({ sizey, cellSize }) =>
    `repeat(${sizey},${cellSize}px)`};
  gap: 1px;

  div {
    background-color: beige;
    font-size: ${({ cellSize }) => `${cellSize}px`};
    line-height: ${({ cellSize }) => `${cellSize - 2}px`};
    text-align: center;
  }
`;

const GameSpaceFC: React.FC<Props> = ({
  sizex,
  sizey,
  cellSize,
  showNeighbors,
  state,
  neighbors,
}) => {
  const size_total = sizex * sizey;
  const insideCell = [];
  for (let y = 0; y < sizey; y++) {
    for (let x = 0; x < sizex; x++) {
      insideCell.push(
        <div key={`${x}_${y}`} data-xy={`${x}_${y}`}>
          {showNeighbors ? neighbors[y][x] : state[y][x] ? "o" : ""}
        </div>
      );
    }
  }

  return (
    <GridWrapper sizex={sizex} cellSize={cellSize}>
      <GrCont sizex={sizex} sizey={sizey} cellSize={cellSize}>
        {insideCell}
      </GrCont>
    </GridWrapper>
  );
};

const connector = connect((state: LifeGameRootState) => state.lifeState);

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { cellSize: number; showNeighbors: boolean };

export const GameSpace = connector(GameSpaceFC);
