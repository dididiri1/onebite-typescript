import { DiaryEntry } from "../types";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = (props: DiaryListProps) => {
  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button text={"새 일기 쓰기"} type={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        {props.diaries.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
