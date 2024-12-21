import { createSlice } from "@reduxjs/toolkit";
import { fetchMonthWater } from "./operations.js";
import { logOut } from "../auth/operations";

const monthWaterListSlice = createSlice({
  name: "monthWaterList",
  initialState: {
    year: null,
    month: null,
    amountWaterPerMonth: 0,
    items: [], //{date, daylyNorm, servings, planDaylyNorm}
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthWater.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMonthWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.month = action.payload.data.data.month;
        state.year = action.payload.data.data.year;
        state.amountWaterPerMonth =
          action.payload.data.data.amountWaterPerMonth;
        state.items = action.payload.data.data.monthWaterList;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.year = null;
        state.month = null;
        state.amountWaterPerMonth = 0;
        state.monthWaterList = [];
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const monthWaterListReducer = monthWaterListSlice.reducer;
