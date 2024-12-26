import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser, updateUser } from "./operations";

// const initialState = {
//   user: {
//     name: null,
//     email: null,
//     avatarUrl: null,
//     daylyNorm: null,
//     gender: null,
//   },
//   accessToken: null,
//   isLoggedIn: false,
//   isRefreshing: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.fulfilled, (state, action) => {
//         state.user = action.payload.data.user;
//         state.accessToken = action.payload.data.accessToken;
//         state.isLoggedIn = true;
//       })
//       .addCase(logIn.fulfilled, (state, action) => {
//         state.user = action.payload.data.user;
//         state.accessToken = action.payload.data.accessToken;
//         state.isLoggedIn = true;
//       })
//       .addCase(logOut.fulfilled, () => {
//         return initialState;
//       })
//       .addCase(refreshUser.fulfilled, (state, action) => {
//         state.user = action.payload.data.user;
//         state.isLoggedIn = true;
//         state.isRefreshing = false;
//       })
//       .addCase(refreshUser.pending, (state) => {
//         state.isRefreshing = true;
//       })
//       .addCase(refreshUser.rejected, (state) => {
//         state.isRefreshing = false;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.user = action.payload.data.user;
//       })
//       .addMatcher(
//         isAnyOf(register.rejected, logIn.rejected),
//         (state, action) => {
//           state.isLoggedIn = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });
const initialState = {
  user: {
    name: null,
    email: null,
    avatarUrl: null,
    daylyNorm: null,
    gender: null,
  },
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false, // Добавлено
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // Обработка успешных операций
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.error = null;
      })
      // Общая обработка ошибок
      .addMatcher(
        isAnyOf(register.rejected, logIn.rejected, logOut.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      // Общая обработка ожидания
      .addMatcher(
        isAnyOf(register.pending, logIn.pending, logOut.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      );
  },
});
export const authReducer = authSlice.reducer;
