import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diary, noIdDiary } from "../../types";

interface DiaryState {
  diaries: Diary[];
  isLoading: boolean;
}

const initialState: DiaryState = {
  diaries: [],
  isLoading: true,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    listDiary(state, action: PayloadAction<Diary[]>) {
      state.diaries = action.payload;
      state.isLoading = false;

      localStorage.setItem("diary", JSON.stringify(state.diaries));
    },
    createDiary(state, action: PayloadAction<noIdDiary>) {
      const newId =
        state.diaries.length > 0
          ? Math.max(...state.diaries.map((item) => item.id)) + 1
          : 1;
      const newDiary = { id: newId, ...action.payload };
      state.diaries.push(newDiary);

      localStorage.setItem("diary", JSON.stringify(state.diaries));
    },
    updateDiary(state, action: PayloadAction<Diary>) {
      state.diaries = state.diaries.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem("diary", JSON.stringify(state.diaries));
    },
    deleteDiary(state, action: PayloadAction<Number>) {
      state.diaries = state.diaries.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("diary", JSON.stringify(state.diaries));
    },
  },
});
