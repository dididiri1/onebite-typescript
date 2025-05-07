import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState } from "react";
import { Diary } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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
  const { diaries } = useSelector((state: RootState) => state.diary);

  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, diaries);

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  //if (isLoading) return <div>로딩 중...</div>;

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
