import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Diary } from "../types";

const useDiary = (id: number) => {
  const data = useContext(DiaryStateContext);

  const nav = useNavigate();

  const [curDiaryItem, setCurDiaryItem] = useState<Diary>();

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentDiaryItem = data?.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않은 일기장입니다.");
      nav("/");
      return;
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id]);

  return curDiaryItem;
};

export default useDiary;
