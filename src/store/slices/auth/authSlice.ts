import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

interface userTypes {
  isLoggedIn: boolean
  accessToken: string
}

const initialAccessToken = getCookie('notesapp-accessToken')

console.log('initialAccessToken', initialAccessToken)

const initialState: userTypes = initialAccessToken
  ? {
      isLoggedIn: true,
      accessToken: initialAccessToken,
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
