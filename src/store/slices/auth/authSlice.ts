import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: userTypes = {
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<Required<userTypes>>) => {
      console.log('action.payload', action.payload)
      state.token = action.payload
    },
    userLoggedOut: (state) => {
      state.token = null
    },
  },
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer
