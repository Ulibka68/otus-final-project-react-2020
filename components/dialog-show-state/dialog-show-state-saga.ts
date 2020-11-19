import { call, put, take } from "redux-saga/effects";
import * as showReducer from "./dialog-show-state-reduser";

function fetchBody(payload: { user: string }) {
  console.log("fetchBody", payload.user);
  return fetch("api/life/?user=" + payload.user, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export function* getSavedStateDromDB() {
  while (true) {
    const action: { type: string; payload: any } = yield take(
      showReducer.sendQuery.type
    );
    const data = yield call(() => {
      return fetchBody(action.payload);
    });
    yield put(showReducer.recieveSqlStatesByUser({ dbItems: data }));
  }
}
