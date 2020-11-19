import {
  takeEvery,
  call,
  put,
  fork,
  race,
  take,
  select,
} from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";

import {
  nextState,
  stopTimer,
  putStateToSQL,
  tStateToSQL,
} from "./life_reducer";
import { getTimerInterval } from "@redux/store";

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

function timerChannels(sec: number) {
  return eventChannel((emitter) => {
    const cnt = 0;
    const timerId = setInterval(() => {
      // console.log("timer : ", ++cnt);
      emitter(cnt);
    }, sec * 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(timerId);
    };
  });
}

export function* timerChannelsSaga() {
  const ti = yield select(getTimerInterval);
  const chanel = yield call(timerChannels, ti);

  while (true) {
    // const event = yield take([chanel, stopTimer.type]);

    const event = yield race({
      chanelE: take(chanel),
      stopTimerE: take(stopTimer.type),
    });

    // console.log("timerChannelsSaga event :", event);

    if (event.stopTimerE) {
      chanel.close(); // по идее сага должна убиться
    } else {
      yield put(nextState(null));
    }
  }
}

// получить action putStateToSQL

const fetcher = (url) => fetch(url).then((res) => res.json());

function fetchBody1() {
  fetch("api/life/ab?hid=1&at-beru-warehouse=1").then((res) => res.json());
}

/*
function fetchBody2() {
  const postData = { text: "data text" };
  fetch("api/life/ab?hid=1&at-beru-warehouse=1", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new FormData(postData),
  });
}
 
 */

function fetchBody3(payload: tStateToSQL) {
  fetch("api/life/putSql", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export function* putStateToSqlSaga() {
  while (true) {
    const action: { type: string; payload: tStateToSQL } = yield take(
      putStateToSQL.type
    ); // пришло событие
    // console.log("========= SAGA START ============");
    const data = yield call(() => {
      return fetchBody3(action.payload);
    });

    // console.log("--------- SAGA -------------------");
    // console.log(data);
  }
}
