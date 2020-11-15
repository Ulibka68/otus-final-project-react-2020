import { takeEvery, call, put, fork, race, take } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";

import { nextState, stopTimer } from "./life_reducer";

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

// обновить состояние с задержкой 1 сек
export function* nextLifeStateAsync() {
  yield call(delay, 1000);
  yield put(nextState(null));
}

function timerChannels(sec: number) {
  return eventChannel((emitter) => {
    let cnt = 0;
    const timerId = setInterval(() => {
      console.log("timer : ", ++cnt);
      emitter(cnt);
    }, sec * 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(timerId);
    };
  });
}

export function* timerChannelsSaga() {
  const chanel = yield call(timerChannels, 2);

  while (true) {
    // const event = yield take([chanel, stopTimer.type]);

    const event = yield race({
      chanelE: take(chanel),
      stopTimerE: take(stopTimer.type),
    });

    console.log("timerChannelsSaga event :", event);

    if (event.stopTimerE) {
      chanel.close(); // по идее сага должна убиться
    } else {
      yield put(nextState(null));
    }
  }
}
