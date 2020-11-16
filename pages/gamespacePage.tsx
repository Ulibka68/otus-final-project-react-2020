import React from "react";
import Layout from "components/layout";
import { useSession } from "next-auth/client";
import { connect, useSelector, ConnectedProps } from "react-redux";
import { NextPageContext, NextPage } from "next";
import * as life from "components/Life/life_reducer";
import { wrapper, LifeGameRootState } from "@redux/store";

import { GameSpace } from "components/Life/gameSpace";
import { keyframes, css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import FormDialog from "components/dialog-timer/dialog";
import FormDialogSaveRedux from "components/dialog-timer/dialog-save-state";

interface OtherProps {
	msg: string;
	appProp: string;
}

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
	// Провести начальную инициализацию жизни
	store.dispatch(life.initState({ sizex: 20, sizey: 20 }));
	store.dispatch(life.randomSeed({ seedPercent: 0.3 }));
	store.dispatch(life.caclNeighbors(null));
	// само состояние с сервера вернется в виде action __NEXT_REDUX_WRAPPER_HYDRATE__
	// А здесь можно просто что дополнительно еще передать с сервера
	return { props: { msg: "LifeGame getStaticProps" } };
});

const FlexWrapper = styled.div`
	display: flex;
	gap: 30px;
`;

const Btn = styled.button`
	margin-top: 20px;
`;

const GameSpacePageFunc: NextPage<OtherProps & PropsFromRedux> = (props) => {
	function calcNextState(e) {
		e.preventDefault();
		props.nextState(null);
		// this.forceUpdate();
	}

	function startTimerSaga(e) {
		e.preventDefault();
		props.startTimer();
	}

	function stopTimerSaga(e) {
		e.preventDefault();
		props.stopTimer();
	}

	function randomFill(e) {
		e.preventDefault();
		props.stopTimer();
		props.randomSeed({ seedPercent: 0.3 });
		props.caclNeighbors(null);
	}

	function setTimerInterval(e) {
		e.preventDefault();
		props.stopTimer();
		props.setTimerInterval({ timerInteraval: 1.5 });
		props.startTimer();
	}

	/*
	componentWillUnmount() {
		this.stopTimerSaga();
	}
   */
	const [session, loading] = useSession();

	// When rendering client side don't display anything until loading is complete
	if (typeof window !== "undefined" && loading) return null;

	return (
		<Layout>
			<FlexWrapper>
				<GameSpace cellSize={20} showNeighbors={false} />
				{/*<GameSpace cellSize={20} showNeighbors={true} />*/}
			</FlexWrapper>

			<p>{props.msg}</p>
			<Btn onClick={calcNextState}>Следующее состояние</Btn>
			<Btn onClick={startTimerSaga}>Запустить таймер</Btn>
			<Btn onClick={stopTimerSaga}>Остановить таймер</Btn>
			<Btn onClick={randomFill}>Заполнить случайно</Btn>
			{session && <FormDialogSaveRedux userNameFromSeesion={session.user.name} />}

			<FormDialog />
		</Layout>
	);
};

const connector = connect((state: LifeGameRootState) => state.lifeState, {
	caclNeighbors: life.caclNeighbors,
	nextState: life.nextState,
	stopTimer: life.stopTimer,
	startTimer: life.startTimer,
	randomSeed: life.randomSeed,
	setTimerInterval: life.setTimerInterval,
});

// The inferred type will look like:
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const GameSpacePage = connector(GameSpacePageFunc);

// eslint-disable-next-line no-restricted-syntax
export default GameSpacePage;
