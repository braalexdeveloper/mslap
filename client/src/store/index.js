import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from "../slices/admin/adminSlice";
import userReducer from "../slices/user/userSlice";
import { cargoSlice } from "../slices/cargo/cargoSlice";
import { projectSlice } from "../slices/project/projectSlice";
import { userCrudSlice } from "../slices/userCrudSlice/userCrudSlice";


const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  cargo:cargoSlice.reducer,
  project:projectSlice.reducer,
  userCrud:userCrudSlice.reducer
 });

const persistConfig = {
  key: "main-root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
