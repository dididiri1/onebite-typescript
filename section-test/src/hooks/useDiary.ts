import { useEffect, useState } from "react";
import { Diary } from "../types";
import { useNavigate } from "react-router-dom";
import { fetchDiary } from "../api/diaryApi";

const useDiary = (id: number) => {
  const [curDiaryItem, setCurDiaryItem] = useState<Diary>();
  const nav = useNavigate();

  useEffect(() => {
    fetchDiary(id)
      .then((res) => {
        setCurDiaryItem(res.data.data);
      })
      .catch((err) => {
        window.alert("존재하지 않는 일기입니다!!!");
        nav("/", { replace: true });
      });
  }, [id]);

  return curDiaryItem;
};

export default useDiary;
