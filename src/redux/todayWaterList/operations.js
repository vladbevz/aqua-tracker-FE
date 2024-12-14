import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://aqua-tracker-be.onrender.com";

// POST @ /setwaterrate
export const setWaterRate = createAsyncThunk(
  "water/setWaterRate",
  async (curDaylyNorm, thunkAPI) => {
    try {
      const response = await axios.post(URL + "/setwaterrate", curDaylyNorm);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
