import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../../store'

const usersSlice = createSlice({
  name: 'users',
  initialState: { allUsers: null },
  reducers: {
    setAllUsers: (state: any, action) => {
      state.allUsers = action.payload
    },
  },
})

export const { setAllUsers } = usersSlice.actions

export const selectAllUsers = (state: AppState) => state.users.allUsers

export default usersSlice.reducer
