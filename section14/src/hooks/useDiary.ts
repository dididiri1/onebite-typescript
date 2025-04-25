import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Diary } from "../types";
import { fetchDiary } from "../api/diaryApi";

const useDiary = (id: number) => {
  const [curDiaryItem, setCurDiaryItem] = useState<Diary | undefined>(
    undefined
  );
  const nav = useNavigate();

  useEffect(() => {
    fetchDiary(Number(id))
      .then((res) => {
        //console.log("useEffect: " + JSON.stringify(res.data.data));
        setCurDiaryItem(res.data.data);
      })
      .catch((err) => {
        window.alert("존재하지 않는 일기입니다.");
        nav("/");
      });
  }, [id]);

  return curDiaryItem;
};

export default useDiary;
