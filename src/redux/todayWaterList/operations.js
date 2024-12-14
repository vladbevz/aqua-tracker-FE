import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// POST @ /setwaterrate
export const setWaterRate = createAsyncThunk(
  "water/setWaterRate",
  async (curDaylyNorm, thunkAPI) => {
    try {
      const response = await axios.post("/setwaterrate", curDaylyNorm);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
