import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lgtm } from '../../domain';

export type LgtmsState = {
  lgtms: Lgtm[];
  evaluatedId?: string;
};

const initialState: LgtmsState = {
  lgtms: [],
};

export const LgtmsModule = createSlice({
  name: 'lgtms',
  initialState,
  reducers: {
    addLgtms: (state: LgtmsState, action: PayloadAction<Lgtm[]>) => {
      state.lgtms = state.lgtms.concat(action.payload);
    },
    clearLgtms: (state: LgtmsState) => {
      state.lgtms = [];
    },
    setEvaluatedId: (state: LgtmsState, action: PayloadAction<string>) => {
      state.evaluatedId = action.payload;
    },
    clearEvaluatedId: (state: LgtmsState) => {
      state.evaluatedId = undefined;
    },
  },
});

export const { actions: lgtmsActions } = LgtmsModule;
