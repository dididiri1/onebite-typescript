import Header from "../components/Header";
import Button from "../components/Button";
import { useContext, useState } from "react";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";
import { startOfMonth, endOfMonth, addMonths } from "date-fns";
import { Diary } from "../types";

const getMonthlyData = (pivotDate: Date, data: Diary[]) => {
  let beginDate = startOfMonth(pivotDate).getTime();
  let endDate = endOfMonth(pivotDate).getTime();

  return data.filter(
    (item) => beginDate <= item.createdDate && item.createdDate <= endDate
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext) || [];

  const [pivotDate, setPivotDate] = useState(new Date());

  const onDecreaseMonth = () => {
    setPivotDate((prev) => addMonths(prev, -1));
  };

  const onIncreaseMonth = () => {
    setPivotDate((prev) => addMonths(prev, 1));
  };

  const monthlyData = getMonthlyData(pivotDate, data);

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text="<" onClick={onDecreaseMonth} />}
        rightChild={<Button text=">" onClick={onIncreaseMonth} />}
      ></Header>
      <DiaryList diaries={monthlyData} />
    </div>
  );
};

export default Home;
