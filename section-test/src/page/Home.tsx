import Header from "../components/Header";
import Button from "../components/Button";
import { useState } from "react";
import DiaryList from "../components/DiaryList";
import { startOfMonth, endOfMonth, addMonths } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Diary } from "../types";

const getMonthlyData = (pivotDate: Date, data: Diary[]) => {
  const beginDate = startOfMonth(pivotDate).getTime();
  const endDate = endOfMonth(pivotDate).getTime();

  return data.filter(
    (item) => beginDate <= item.createdDate && item.createdDate <= endDate
  );
};

const Home = () => {
  const [pivotDate, setPivotDate] = useState(new Date());

  // ✅ Redux에서 diaries 가져오기
  const { diaries, isLoading, error } = useSelector(
    (state: RootState) => state.diary
  );
  const monthlyData = getMonthlyData(pivotDate, diaries);

  const onDecreaseMonth = () => {
    setPivotDate((prev) => addMonths(prev, -1));
  };

  const onIncreaseMonth = () => {
    setPivotDate((prev) => addMonths(prev, 1));
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (  
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text="<" onClick={onDecreaseMonth} />}
        rightChild={<Button text=">" onClick={onIncreaseMonth} />}
      />
      <DiaryList diaries={monthlyData} />
    </div>
  );
};

export default Home;
