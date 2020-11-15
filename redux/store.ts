import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork, take } from "redux-saga/effects";
import { timerChannelsSaga } from "components/Life/life_saga";
import * as life_reducer from "components/Life/life_reducer";
import logger from "redux-logger";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";

function* rootSaga() {
  while (true) {
    const event = yield take(life_reducer.startTimer.type);
    yield fork(timerChannelsSaga);
  }
}

const reducer = combineReducers({
  lifeState: life_reducer.reducer,
});

export type LifeGameRootState = ReturnType<typeof reducer>;

// Context = NextPageContext | AppContext | GetStaticPropsContext | GetServerSidePropsContext;

export const makeStore: MakeStore<LifeGameRootState> = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  console.warn("context", context);

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

  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware, logger],
    devTools: true,
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<LifeGameRootState>(makeStore, {
  debug: true,
});
