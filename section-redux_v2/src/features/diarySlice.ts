import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import { Diary, noIdDiary } from "../types";
import {
  createDiary,
  deleteDiary,
  fetchDiaries,
  fetchDiary,
  updateDiary,
} from "../api/diaryApi";

interface DiaryState {
  diaryList: Diary[];
  selectedDiary: Diary | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DiaryState = {
  diaryList: [],
  selectedDiary: null,
  isLoading: true,
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
        state.diaryList = action.payload;
      })
      .addCase(fetchDiariesThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = "일기 불러오기 실패";
      })
      .addCase(fetchDiaryThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDiaryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedDiary = action.payload;
      })
      .addCase(fetchDiaryThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = "일기 불러오기 실패";
      })
      .addCase(createDiaryThunk.fulfilled, (state, action) => {
        state.diaryList.push(action.payload);
      })
      .addCase(updateDiaryThunk.fulfilled, (state, action) => {
        state.diaryList = state.diaryList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteDiaryThunk.fulfilled, (state, action) => {
        state.diaryList = state.diaryList.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default diarySlice.reducer;
