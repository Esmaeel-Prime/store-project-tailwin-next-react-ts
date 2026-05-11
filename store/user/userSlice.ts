"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserType = {
  _id: "",
  email: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserType }>) => {
      state = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
