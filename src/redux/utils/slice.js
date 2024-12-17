import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoad: "",
};

const utilsSlice = createSlice({
  name: "utils",
  initialState: initialState,
  reducers: {
    changeLoadStatus(state, actyons) {
      state.showLoad = actyons.payload;
    },
  },
});

export const { changeLoadStatus } = utilsSlice.actions;

export const utilsReducer = utilsSlice.reducer;
