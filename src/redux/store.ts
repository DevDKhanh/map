import { persistReducer, persistStore } from "redux-persist";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import userReducer from "./reducer/user";

const persistConfigUser = {
  key: "user",
  storage,
  blacklist: ["data", "center", "layerFocus"],
};

const reducers = combineReducers({
  user: persistReducer(persistConfigUser, userReducer),
});

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
