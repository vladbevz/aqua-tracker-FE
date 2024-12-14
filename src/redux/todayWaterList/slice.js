import { createSlice } from "@reduxjs/toolkit";
import { setWaterRate } from "./operations";

const todayWaterListSlice = createSlice({
  name: "todayWaterList",
  initialState: {
    item: { date: null, amount: null, curDaylyNorm: null }, // {date, amount, curDaylyNorm}
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setWaterRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setWaterRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.item = action.payload;
      })
      .addCase(setWaterRate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const todayWaterListReducer = todayWaterListSlice.reducer;
