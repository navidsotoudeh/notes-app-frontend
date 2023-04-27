import { createSlice } from '@reduxjs/toolkit'

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

export const selectAllUsers = (state) => state.users.allUsers

export default usersSlice.reducer
