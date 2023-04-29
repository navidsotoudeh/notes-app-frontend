import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

interface userTypes {
  isLoggedIn: boolean
  token: string | null
}

const initialState: userTypes = getCookie('token')
  ? {
      isLoggedIn: true,
      token: null,
    }
  : {
      isLoggedIn: false,
      token: null,
    }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<Required<userTypes>>) => {
      state.token = action.payload
      state.isLoggedIn = true
    },
    userLoggedOut: (state, action) => {
      state.token = null
      state.isLoggedIn = false
    },
  },
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer

// export const selectCurrentToken = () =>
//   localStorage.getItem('notesapp-accessToken')
