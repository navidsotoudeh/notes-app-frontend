import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import authReducer from "./slices/auth/authSlice";
import usersReducer from "./slices/users/usersSlice";

import { authApi } from "../service/auth/authApi";
import { usersApi } from "../service/users/userApi";

const makeStore = () =>
  configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [authApi.reducerPath]: authApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      auth: authReducer,
      users: usersReducer,
    },
    devTools: true,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
  });

export const wrapper = createWrapper(makeStore);
