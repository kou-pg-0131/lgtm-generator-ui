import { EnhancedStore, combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { LgtmsModule, LgtmsState } from './lgtmsModule';

export const createStore = (): EnhancedStore => configureStore({
  middleware: getDefaultMiddleware(),
  reducer: combineReducers({
    lgtms: LgtmsModule.reducer,
  }),
});

export type States = {
  lgtms: LgtmsState;
};

export * from './lgtmsModule';
