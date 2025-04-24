import axios from "axios";
import { Diary } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchDiaries = () => api.get("/diary");
export const fetchDiary = (id: Number) => api.get(`/diary/${id}`);
export const createDiary = (data: Omit<Diary, "id">) =>
  api.post("/diary", data);
export const updateDiary = (id: Number, data: Omit<Diary, "id">) =>
  api.patch(`/diary/${id}`, data);
export const deleteDiary = (id: Number) => api.delete(`/diary/${id}`);
