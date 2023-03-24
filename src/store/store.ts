import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./slices/auth/authSlice";
import { userAuthApi } from "../service/userauth/userAuthApi";
const makeStore = () =>
  configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [userAuthApi.reducerPath]: userAuthApi.reducer,
      // user: userReducer,
      auth: authReducer,
    },
    devTools: true,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAuthApi.middleware),
  });

export const wrapper = createWrapper(makeStore);
