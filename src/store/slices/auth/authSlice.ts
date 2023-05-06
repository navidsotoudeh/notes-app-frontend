import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { getCookie } from 'cookies-next'

interface userTypes {
  isLoggedIn: boolean
  accessToken: string | null
}

// const initialAccessToken = getCookie('notesapp-accessToken')

const initialState: userTypes = {
  isLoggedIn: false,
  accessToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: any) => {
      state.accessToken = action.payload
      state.isLoggedIn = true
    },
    userLoggedOut: (state, action) => {
      state.accessToken = null
      state.isLoggedIn = false
    },
  },
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer
