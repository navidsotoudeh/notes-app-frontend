import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: userTypes = {
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<Required<userTypes>>) => {
      state.token = action.payload.token
    },
    userLoggedOut: (state) => {
      state.token = null
    },
  },
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer
