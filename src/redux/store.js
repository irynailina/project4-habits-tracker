import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './auth/authReducer';
import { habitsSlice } from './habits/habitsReducer';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth.access_token', 'userName'],
};
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [habitsSlice.name]: habitsSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});
export const persistor = persistStore(store);
