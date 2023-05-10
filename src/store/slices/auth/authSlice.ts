import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userTypes {
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
    logOut: (state, action) => {
      console.log('state', state)
      state.accessToken = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer
