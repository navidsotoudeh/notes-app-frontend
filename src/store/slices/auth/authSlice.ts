import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { getCookie } from 'cookies-next'
import Cookies from 'js-cookie'

interface userTypes {
  isLoggedIn: boolean
  accessToken: string | null
}

// const initialAccessToken = getCookie('notesapp-accessToken')
// const initialState = {
//   value: Cookies.get('notesapp-accessToken') || '',
// }

const initialState: userTypes = Cookies.get('notesapp-accessToken')
  ? {
      isLoggedIn: false,
      accessToken: Cookies.get('notesapp-accessToken'),
    }
  : {
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
