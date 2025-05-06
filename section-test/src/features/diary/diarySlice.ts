import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Diary, noIdDiary } from "../../types";
import {
  fetchDiaries,
  fetchDiary,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../../api/diaryApi";

interface DiaryState {
  diaries: Diary[];
  currentDiary: Diary | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DiaryState = {
  diaries: [],
  currentDiary: null,
  isLoading: false,
  error: null,
};

export const fetchDiariesThunk = createAsyncThunk(
  "diary/fetchAll",
  async () => {
    const res = await fetchDiaries();
    return res.data.data;
  }
);

export const fetchDiaryThunk = createAsyncThunk(
  "diary/fetchOne",
  async (id: number) => {
    const res = await fetchDiary(id);
    return res.data.data;
  }
);

export const createDiaryThunk = createAsyncThunk(
  "diary/create",
  async (data: noIdDiary) => {
    const res = await createDiary(data);
    return res.data.data;
  }
);

export const updateDiaryThunk = createAsyncThunk(
  "diary/update",
  async ({ id, data }: { id: number; data: noIdDiary }) => {
    const res = await updateDiary(id, data);
    return res.data.data;
  }
);

export const deleteDiaryThunk = createAsyncThunk(
  "diary/delete",
  async (id: number) => {
    await deleteDiary(id);
    return id;
  }
);

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiariesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiariesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaries = action.payload;
      })
      .addCase(fetchDiariesThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = "일기 불러오기 실패";
      })
      .addCase(fetchDiaryThunk.fulfilled, (state, action) => {
        state.currentDiary = action.payload;
      })
      .addCase(createDiaryThunk.fulfilled, (state, action) => {
        state.diaries.push(action.payload);
      })
      .addCase(updateDiaryThunk.fulfilled, (state, action) => {
        state.diaries = state.diaries.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteDiaryThunk.fulfilled, (state, action) => {
        state.diaries = state.diaries.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default diarySlice.reducer;
