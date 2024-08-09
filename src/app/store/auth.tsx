import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";
export interface AuthState {
  userToken?: string;
  userName?: string;
}
const initialState: AuthState = {
  userToken: undefined,
  userName: undefined,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<string | undefined>) => {
      state.userName = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string | undefined>) => {
      state.userToken = action.payload;
    },
  },
});

export const { setUserToken, updateUser } = authSlice.actions;
export const selectUser = (state: RootState) => {
  return state.auth.userName;
};
export const selectUserToken = (state: RootState) => state.auth.userToken;
export default authSlice.reducer;
