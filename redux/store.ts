import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork, take } from "redux-saga/effects";
import { timerChannelsSaga } from "components/Life/life_saga";
import * as life_reducer from "components/Life/life_reducer";
import { lifeSaga } from "components/Life/life_saga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield fork(lifeSaga);
  // yield fork(GlobalWindowClickSaga);

  while (true) {
    const event = yield take(life_reducer.startTimer.type);
    yield fork(timerChannelsSaga);
  }
}

const reducer = combineReducers({
  lifeState: life_reducer.reducer,
});

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type LifeGameRootState = ReturnType<typeof reducer>;
