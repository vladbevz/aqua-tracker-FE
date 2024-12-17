import { createSlice } from "@reduxjs/toolkit";
import { fetchMonthWater } from "./operations.js";
import { logOut } from "../auth/operations";

const monthWaterListSlice = createSlice({
  name: "monthWaterList",
  initialState: {
    month: null,
    amountWaterPerMont: 0,
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
        state.month = action.payload.data.monthWaterList.month;
        state.amountWaterPerMont =
          action.payload.data.monthWaterList.amountWaterPerMont;
        state.items = action.payload.data.monthWaterList.monthWaterList;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.month = null;
        state.amountWaterPerMont = 0;
        state.monthWaterList = [];
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const monthWaterListReducer = monthWaterListSlice.reducer;
