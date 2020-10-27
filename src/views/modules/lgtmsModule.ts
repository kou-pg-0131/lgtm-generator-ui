import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lgtm } from '../../domain';
import { DataStore } from '../../infrastructures';

const dataStore = new DataStore();

export type LgtmsState = {
  favorites: Lgtm[];
  lgtms: Lgtm[];
  evaluatedId?: string;
  fetchingLgtms: boolean;
};

const initialState: LgtmsState = {
  favorites: dataStore.getFavorites(),
  lgtms: [],
  fetchingLgtms: false,
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
    setFetchingLgtms: (state: LgtmsState, action: PayloadAction<boolean>) => {
      state.fetchingLgtms = action.payload;
    },
    setEvaluatedId: (state: LgtmsState, action: PayloadAction<string | undefined>) => {
      state.evaluatedId = action.payload;
    },
    clearEvaluatedId: (state: LgtmsState) => {
      state.evaluatedId = undefined;
    },
    addFavorite: (state: LgtmsState, action: PayloadAction<Lgtm>) => {
      state.favorites = [action.payload, ...state.favorites];
      dataStore.setFavorites(state.favorites);
    },
    removeFavorite: (state: LgtmsState, action: PayloadAction<Lgtm>) => {
      state.favorites = state.favorites.filter(e => e.id !== action.payload.id);
      dataStore.setFavorites(state.favorites);
    },
  },
});

export const { actions: lgtmsActions } = LgtmsModule;
