import axios from "axios";
import { noIdDiary } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-type": "Application/json",
  },
});

export const fetchDiaries = () => api.get("/diary");

export const fetchDiary = (id: number) => api.get(`/diary/${id}`);

export const createDiary = (data: noIdDiary) => api.post(`/diary`, data);

export const updateDiary = (id: number, data: noIdDiary) =>
  api.patch(`/diary/${id}`, data);

export const deleteDiary = (id: number) => api.delete(`/diary/${id}`);
