import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { LifeGameRootState } from "redux/store";
import * as life from "components/Life/life_reducer";
import { GameSpace } from "components/Life/gameSpace";
import { keyframes, css, Global } from "@emotion/react";
import styled from "@emotion/styled";

const FlexWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const Btn = styled.button`
  margin-top: 20px;
`;

class GameSpacePageClass extends React.Component<Props> {
  calcNextState = () => {
    this.props.nextState(null);
    // this.forceUpdate();
  };

  startTimerSaga = () => {
    this.props.startTimer();
  };

  stopTimerSaga = () => {
    this.props.stopTimer();
  };

  componentWillUnmount() {
    this.stopTimerSaga();
  }

  render() {
    return (
      <div>
        <FlexWrapper>
          <GameSpace cellSize={20} showNeighbors={false} />
          <GameSpace cellSize={20} showNeighbors={true} />
        </FlexWrapper>

        <Btn onClick={this.calcNextState}>Следующее состояние</Btn>
        <Btn onClick={this.startTimerSaga}>Запустить таймер</Btn>
        <Btn onClick={this.stopTimerSaga}>Остановить таймер</Btn>
      </div>
    );
  }
}

const connector = connect((state: LifeGameRootState) => state.lifeState, {
  caclNeighbors: life.caclNeighbors,
  nextState: life.nextState,
  stopTimer: life.stopTimer,
  startTimer: life.startTimer,
});

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export const GameSpacePage = connector(GameSpacePageClass);
