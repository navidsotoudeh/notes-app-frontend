import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from './slices/auth/authSlice'
import usersReducer from './slices/users/usersSlice'
import notesReducer from './slices/notes/notesSlice'

import { authApi } from '@/service/auth/authApi'
import { usersApi } from '@/service/users/usersApi'
import { notesApi } from '@/service/notes/notesApi'

const makeStore = () =>
  configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [authApi.reducerPath]: authApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [notesApi.reducerPath]: notesApi.reducer,
      auth: authReducer,
      users: usersReducer,
      notes: notesReducer,
    },
    devTools: true,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        usersApi.middleware,
        notesApi.middleware
      ),
  })

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export const wrapper = createWrapper(makeStore)
