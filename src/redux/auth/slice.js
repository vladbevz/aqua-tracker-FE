import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser, updateUser } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    avatarUrl: null,
    daylyNorm: null,
    gender: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(
        isAnyOf(register.rejected, logIn.rejected),
        (state, action) => {
          state.isLoggedIn = false;
          state.error = action.payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
