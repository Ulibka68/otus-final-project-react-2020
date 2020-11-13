import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export interface lifeStateType {
  state: number[][];
  neighbors: number[][];
  sizex: number;
  sizey: number;
}

const defaultlifeState: lifeStateType = {
  state: [],
  neighbors: [],
  sizex: 0,
  sizey: 0,
};

function fillStateFromConst(
  state: number[][],
  b: number[][],
  startx: number,
  starty: number
) {
  for (let y = 0; y < b.length; y++) {
    for (let x = 0; x < b[0].length; x++) {
      state[starty + y][startx + x] = b[y][x];
    }
  }
}

const caclNeighborsInternal: CaseReducer<lifeStateType, PayloadAction<void>> = (
  state
) => {
  function checkOneNeigbor(
    deltaX: number,
    deltaY: number,
    x: number,
    y: number
  ): number {
    x += deltaX;
    y += deltaY;

    if (x < 0 || y < 0) return 0;
    if (x >= state.sizex || y >= state.sizey) return 0;
    return state.state[y][x];
  }

  for (let y = 0; y < state.sizey; y++) {
    for (let x = 0; x < state.sizex; x++) {
      let numNeighbors = 0;

      // 8 вариантов соседей
      for (let deltaX = -1; deltaX <= 1; deltaX++) {
        for (let deltaY = -1; deltaY <= 1; deltaY++) {
          if (!(deltaX === 0 && deltaY === 0))
            numNeighbors += checkOneNeigbor(deltaX, deltaY, x, y);
        }
      }

      state.neighbors[y][x] = numNeighbors;
    }
  }
};

export const lifeStateSlice = createSlice<
  lifeStateType,
  SliceCaseReducers<lifeStateType>
>({
  name: "lifeState",
  initialState: defaultlifeState,
  reducers: {
    initState(
      state,
      action: PayloadAction<{
        sizex: number;
        sizey: number;
      }>
    ) {
      return {
        state: Array.from(Array(action.payload.sizey), () =>
          new Array(action.payload.sizex).fill(0)
        ),
        neighbors: Array.from(Array(action.payload.sizey), () =>
          new Array(action.payload.sizex).fill(0)
        ),
        sizex: action.payload.sizex,
        sizey: action.payload.sizey,
      };
    },

    randomSeed(state, action: PayloadAction<{ seedPercent: number }>) {
      function randSize(size: number): number {
        let x = Math.floor(Math.random() * size);
        if (x === size) x--;
        return x;
      }

      //  заполнить массив случайно
      const totalSize = Math.floor(
        state.sizex * state.sizey * action.payload.seedPercent
      );
      for (let i = 0; i < totalSize; i++) {
        const xRand = randSize(state.sizex);
        const yRand = randSize(state.sizey);
        state.state[yRand][xRand] = 1;
      }
    },

    planer1Seed(
      state,
      action: PayloadAction<{ startx: number; starty: number }>
    ) {
      const b = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
      ];

      fillStateFromConst(
        state.state,
        b,
        action.payload.startx,
        action.payload.starty
      );
    },

    caclNeighbors: caclNeighborsInternal,

    nextState(state, action: PayloadAction<void>) {
      for (let y = 0; y < state.sizey; y++) {
        for (let x = 0; x < state.sizex; x++) {
          if (state.state[y][x] > 0) {
            if (state.neighbors[y][x] < 2 || state.neighbors[y][x] > 3)
              state.state[y][x] = 0;
          } else {
            if (state.neighbors[y][x] === 3) state.state[y][x] = 1;
          }
        }
      }
      caclNeighborsInternal(state, action);
    },
  },
});

export const stopTimer = createAction<void>("lifeState/STOP_TIMER");
export const startTimer = createAction<void>("lifeState/START_TIMER");

// export const { reducer, actions } = lifeStateSlice;
export const { reducer } = lifeStateSlice;
export const {
  nextState,
  caclNeighbors,
  planer1Seed,
  randomSeed,
  initState,
} = lifeStateSlice.actions;
