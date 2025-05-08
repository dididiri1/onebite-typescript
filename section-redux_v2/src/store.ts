import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "./features/diarySlice";

const store = configureStore({
  reducer: {
    diary: diaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisaptch = typeof store.dispatch;
export default store;
