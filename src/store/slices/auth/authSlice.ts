import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userTypes {
  isLoggedIn: boolean
  accessToken: string | null
}

const initialState: userTypes = {
  accessToken: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: any) => {
      state.accessToken = action.payload
    },
    userLoggedOut: (state, action) => {
      state.accessToken = null
    },
  },
})

export const { setCredentials, userLoggedOut } = authSlice.actions

export default authSlice.reducer
