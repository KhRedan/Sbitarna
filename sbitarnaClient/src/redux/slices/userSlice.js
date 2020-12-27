import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    role: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setState: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
  },
});

export const { setUsername, setRole, setState } = userSlice.actions;

export const selectUsername = (state) => state.user.username;
export const selectRole = (state) => state.user.role;

export default userSlice.reducer;
