import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: noteTypes = {
  token: undefined,
  user: undefined,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<Required<userTypes>>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = notesSlice.actions;
export default notesSlice.reducer;
