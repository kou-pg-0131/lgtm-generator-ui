import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lgtm } from '../../domain';
import { DataStore } from '../../infrastructures';

const dataStore = new DataStore();

export type LgtmsState = {
  favorites: Lgtm[];
  lgtms: Lgtm[];
  evaluatedId?: string;
};

const initialState: LgtmsState = {
  favorites: dataStore.getFavorites(),
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
    setEvaluatedId: (state: LgtmsState, action: PayloadAction<string | undefined>) => {
      state.evaluatedId = action.payload;
    },
    clearEvaluatedId: (state: LgtmsState) => {
      state.evaluatedId = undefined;
    },
    toggleFavorite: (state: LgtmsState, action: PayloadAction<Lgtm>) => {
      if (state.favorites.find(e => e.id === action.payload.id)) {
        state.favorites = state.favorites.filter(e => e.id !== action.payload.id);
      } else {
        state.favorites = [action.payload, ...state.favorites];
      }
      dataStore.setFavorites(state.favorites);
    },
  },
});

export const { actions: lgtmsActions } = LgtmsModule;
