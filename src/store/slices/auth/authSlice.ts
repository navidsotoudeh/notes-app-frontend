import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

interface userTypes {
  isLoggedIn: boolean
  accessToken: string | null
}

const initialState: userTypes = getCookie('token')
  ? {
      isLoggedIn: true,
      accessToken: null,
    }
  : {
      isLoggedIn: false,
      accessToken: null,
    }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<Required<userTypes>>) => {
      console.log('action 24', action)
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

// export const selectCurrentToken = () =>
//   localStorage.getItem('notesapp-accessToken')
