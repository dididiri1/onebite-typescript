import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";
import { DiaryEntry } from "../types";

export const getMonthlyData = (pivotDate: Date, data: DiaryEntry[]) => {
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
  const data = useContext(DiaryStateContext) || [];

  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
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
