import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://aqua-tracker-be.onrender.com";

// GET @ /water/year/month
// Month : 0 - 11
export const fetchMonthWater = createAsyncThunk(
  "monthWater/fetchWater",
  async ({ year, month }, thunkAPI) => {
    try {
      const authHeader = "Bearer " + thunkAPI.getState().auth.accessToken;
      console.log("fetchMonthWater");
      const res = await axios.get(URL + "/water/" + year + "/" + month, {
        headers: {
          Authorization: authHeader,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);
