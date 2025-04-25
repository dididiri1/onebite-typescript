import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";

interface Props {
  diaries: Diary[];
}

const DiaryList = ({ diaries }: Props) => {
  const onChageSortType = () => {};
  const nav = useNavigate();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChageSortType}>
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
        {diaries.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
