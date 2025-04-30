import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { Diary } from "../types";
import { useState } from "react";

interface Props {
  diaries: Diary[];
}

const DiaryList = ({ diaries }: Props) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState("");

  const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return diaries.toSorted((a, b) => {
      if (sortType === "letest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(a.createdDate) - Number(b.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"letest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          text="새 일기 쓰기"
          type="POSITIVE"
          onClick={() => {
            nav("/new");
          }}
        ></Button>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
