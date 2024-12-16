// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosToast from "./toast";

const URL = "https://aqua-tracker-be.onrender.com";

// Utility to add JWT
const setAuthHeader = (accessToken) => {
  axiosToast.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axiosToast.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /auth/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosToast.post(URL + "/auth/signup", credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/signin
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosToast.post(URL + "/auth/signin", credentials);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosToast.post(URL + "/auth/logout");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await axiosToast.get(URL + "/users/current"); //Get information about the current user
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * PATCH @ /update
 * headers: Authorization: Bearer token
 */
export const updateUser = createAsyncThunk(
  "auth/update",
  async (multipartFormData, thunkAPI) => {
    const authHeader = "Bearer " + thunkAPI.getState().auth.accessToken;
    try {
      const res = await axiosToast.patch(
        URL + "/users/update",
        multipartFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authHeader, //CHECK: Is it need?
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
