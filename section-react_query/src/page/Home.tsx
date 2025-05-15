import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState } from "react";
import { Diary } from "../types";
import { useQuery } from "@tanstack/react-query";
import { fetchDiaries } from "../api/diaryApi";

export const getMonthlyData = (pivotDate: Date, data: Diary[]) => {
  const beginDate = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endDate = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    12,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginDate <= item.createdDate && item.createdDate <= endDate
  );
};

const Home = () => {
  const { data, isLoading, error } = useQuery<Diary[]>({
    queryKey: ["diaries"],
    queryFn: async () => {
      const res = await fetchDiaries();
      return res.data.data;
    },
  });

  const [pivotDate, setPivotDate] = useState(new Date());

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) {
    return <div>데이터가 없습니다...</div>;
  }

  const monthlyData = getMonthlyData(pivotDate, data);

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      ></Header>
      <DiaryList diaries={monthlyData} />
    </div>
  );
};

export default Home;
