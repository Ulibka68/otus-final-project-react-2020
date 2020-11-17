import {
  Action,
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export interface tShowStateType {
  dbItems: any[];
}

const defaultShowState: tShowStateType = {
  dbItems: [],
};

export const dialogShowStateSlice = createSlice<
  tShowStateType,
  SliceCaseReducers<tShowStateType>
>({
  name: "dialogshowstateslice",
  initialState: defaultShowState,

  reducers: {
    recieveSqlStatesByUser(state, action: PayloadAction<tShowStateType>) {
      state.dbItems = action.payload.dbItems;
    },
  },
});

export const sendQuery = createAction<{ user: string }>(
  "dialogshowstateslice/SEND_QUERY_BY_USER"
);

// export const { reducer, actions } = lifeStateSlice;
export const { reducer } = dialogShowStateSlice;
export const { recieveSqlStatesByUser } = dialogShowStateSlice.actions;
