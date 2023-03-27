import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: { allUsers: null },
  reducers: {
    setAllUsers: (state: any, action) => {
      state.allUsers = action.payload;
    },
    // userLoggedIn: (state, action: PayloadAction<Required<userTypes>>) => {
    //   state.token = action.payload.token;
    //   state.user = action.payload.user;
    // },
    // userLoggedOut: (state) => {
    //   state.token = undefined;
    //   state.user = undefined;
    // },
  },
});

export const { userLoggedIn, userLoggedOut, setAllUsers } = usersSlice.actions;

export const selectAllUsers = (state) => state.users.allUsers;

export default usersSlice.reducer;
