import React from "react";
import Layout from "components/layout";
import { useSession } from "next-auth/client";
import { connect, useSelector } from "react-redux";
import { NextPageContext, NextPage } from "next";
import * as life from "components/Life/life_reducer";
import { wrapper, LifeGameRootState } from "@redux/store";

interface OtherProps {
	msg: string;
	appProp: string;
}

const LifeGame: NextPage<OtherProps> = ({ msg }) => {
	const [session, loading] = useSession();
	const currentLifeState: life.lifeStateType = useSelector<life.lifeStateType, life.lifeStateType>((state) => state);

	// console.log(session);

	// console.log("********************************************************************");
	// console.log(currentLifeState);
	// console.log("--------------------------------------------------------------------");
	return (
		<Layout>
			<p>Заготовка для game of life</p>
			<p>{msg}</p>
		</Layout>
	);
};

// eslint-disable-next-line no-restricted-syntax
export default LifeGame;

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
	// Провести начальную инициализацию жизни
	store.dispatch(life.initState({ sizex: 10, sizey: 10 }));
	store.dispatch(life.randomSeed({ seedPercent: 0.3 }));
	store.dispatch(life.caclNeighbors(null));
	// само состояние с сервера вернется в виде action __NEXT_REDUX_WRAPPER_HYDRATE__
	// А здесь можно просто что дополнительно еще передать с сервера
	return { props: { msg: "LifeGame getStaticProps" } };
});

/*
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


 */
