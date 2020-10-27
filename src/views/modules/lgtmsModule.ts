import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lgtm } from '../../domain';
import { DataStore } from '../../infrastructures';

const dataStore = new DataStore();

export type LgtmsState = {
  favorites: Lgtm[];
};

const initialState: LgtmsState = {
  favorites: dataStore.getFavorites(),
};

export const LgtmsModule = createSlice({
  name: 'lgtms',
  initialState,
  reducers: {
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
