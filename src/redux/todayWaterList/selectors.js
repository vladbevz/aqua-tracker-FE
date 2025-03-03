export const selectTodayWaterList = (state) => state.todayWater.items;
// export const selectTodayWaterList = (state) => state.todayWaterList.items;
export const selectTodayWaterDaylyNorm = (state) =>
  state.todayWaterList.daylyNorm;
export const selectTodayWaterAmountWaterPerDay = (state) =>
  state.todayWaterList.amountWaterPerDay;
export const selectTodayWaterServings = (state) =>
  state.todayWaterList.servings;
export const selectTodayWaterPercent = (state) => state.todayWater.percent;
// export const selectTodayWaterPercent = (state) => state.todayWaterList.percent;
export const selectTodayWater = (state) => state.todayWaterList;
export const selectIsLoading = (state) => state.todayWaterList.isLoading;
export const selectTodayWaterData = (state) => state.todayWaterList;