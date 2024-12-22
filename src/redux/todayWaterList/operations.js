import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://aqua-tracker-be.onrender.com";

// GET @ /water
export const fetchTodayWater = createAsyncThunk(
  "todayWater/fetchWater",
  async (_, thunkAPI) => {
    try {
      const authHeader = "Bearer " + thunkAPI.getState().auth.accessToken;
      const res = await axios.get(URL + "/water", {
        headers: {
          Authorization: authHeader,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  }
);

// POST @ /water
export const addTodayWater = createAsyncThunk(
  "todayWater/addWater",
  async (water, thunkAPI) => {
    try {
      const authHeader = "Bearer " + thunkAPI.getState().auth.accessToken;
      const response = await axios.post(URL + "/water", water, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.data.message);
    }
  }
);

// DELETE @ /water/:id
export const deleteTodayWater = createAsyncThunk(
  "todayWater/deleteWater",
  async (waterId, thunkAPI) => {
    try {
      const authHeader = "Bearer " + thunkAPI.getState().auth.accessToken;
      const res = await axios.delete(`${URL}/water/${waterId}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.data.message);
    }
  }
);

/*
 * PATCH @ /update
 * headers: Authorization: Bearer token
 */
export const updateTodayWater = createAsyncThunk(
  "todayWater/updateWater",
  async (water, thunkAPI) => {
    try {
      const authHeader = "Bearer " + thunkAPI.getState().auth.accessToken;
      const res = await axios.patch(
        `${URL}/water/${water.waterId}`,
        {
          date: water.date,
          amount: water.amount,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  }
);
