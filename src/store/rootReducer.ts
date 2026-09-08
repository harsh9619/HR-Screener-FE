import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/reducer';
import { rolesReducer } from './roles/reducer';
import { candidatesReducer } from './candidates/reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  roles: rolesReducer,
  candidates: candidatesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = RootState;
