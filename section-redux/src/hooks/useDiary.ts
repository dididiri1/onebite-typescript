import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Diary } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const useDiary = (id: number) => {
  const { diaries, isLoading } = useSelector((state: RootState) => state.diary);
  const [curDiaryItem, setCurDiaryItem] = useState<Diary>();
  const nav = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    const currentDiaryItem = diaries.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id, nav, diaries, isLoading]);

  return curDiaryItem;
};

export default useDiary;
