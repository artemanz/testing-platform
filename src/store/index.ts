import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { quizSlice } from "./slices/quiz";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    quiz: quizSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
