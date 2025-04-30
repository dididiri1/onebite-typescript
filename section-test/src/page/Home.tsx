import Button from "../components/Button";
import Header from "../components/Header";
import DiaryList from "../components/DiaryList";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";
import { Diary } from "../types";
import { startOfMonth, endOfMonth, addMonths } from "date-fns";

export const getMothlyData = (pivotDate: Date, data: Diary[]) => {
  let startDate = startOfMonth(pivotDate).getTime();
  let endDate = endOfMonth(pivotDate).getTime();

  return data.filter(
    (item) => startDate <= item.createdDate && endDate >= item.createdDate
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext) || [];

  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMothlyData(pivotDate, data);

  const onDecreaseMonth = () => {
    setPivotDate((prev) => addMonths(prev, -1));
  };

  const onIncreaseMonth = () => {
    setPivotDate((prev) => addMonths(prev, 1));
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
