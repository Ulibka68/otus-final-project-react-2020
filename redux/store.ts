import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork, take } from "redux-saga/effects";
import {
  timerChannelsSaga,
  putStateToSqlSaga,
} from "components/Life/life_saga";
import { getSavedStateDromDB } from "components/dialog-show-state/dialog-show-state-saga";
import logger from "redux-logger";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import * as life_reducer from "components/Life/life_reducer";
import * as show from "components/dialog-show-state/dialog-show-state-reduser";

function* rootSaga() {
  yield fork(putStateToSqlSaga);
  yield fork(getSavedStateDromDB);
  while (true) {
    const event = yield take(life_reducer.startTimer.type);
    yield fork(timerChannelsSaga);
  }
}

const reducer = combineReducers({
  lifeState: life_reducer.reducer,
  show: show.reducer,
});

export type LifeGameRootState = ReturnType<typeof reducer>;

export const getTimerInterval = (state: LifeGameRootState) =>
  state.lifeState.timer_next_state_second;

// Context = NextPageContext | AppContext | GetStaticPropsContext | GetServerSidePropsContext;

export const makeStore: MakeStore<LifeGameRootState> = (context: Context) => {
  const URL = (context as any)?.ctx?.req?.url;

  let store;
  if (URL) {
    console.log("------- Store создается на сервере ------- ");
    //  на сервере мне saga не нужна
    store = configureStore({
      reducer,
      // middleware: [logger],
      devTools: true,
    });
  } else {
    // store создается на клиенте
    console.log("------- Store создавется на клиенте ------- ");
    const sagaMiddleware = createSagaMiddleware();

    // во время разработки
    // https://webpack.js.org/guides/hot-module-replacement/
    /*
    if (module.hot) {
      module.hot.accept("./reducer", () => {
        console.warn("Replacing reducer");
        store.replaceReducer(require("./reducer").default);
      });
    }
     */

    store = configureStore({
      reducer,
      // middleware: [sagaMiddleware, logger],
      middleware: [sagaMiddleware],
      devTools: true,
    });

    sagaMiddleware.run(rootSaga);
  }
  return store;
};

export const wrapper = createWrapper<LifeGameRootState>(makeStore, {
  debug: false,
});
