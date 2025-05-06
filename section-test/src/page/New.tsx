import { useDispatch } from "react-redux";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { noIdDiary } from "../types";
import { useNavigate } from "react-router-dom";
import { createDiaryThunk } from "../features/diary/diarySlice";
import { AppDispatch } from "../store";

const New = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  const onSubmit = (input: noIdDiary) => {
    dispatch(createDiaryThunk(input));
    nav("/");
  };

  return (
    <div>
      <Header title="새 일기 쓰기" leftChild={<Button text="< 뒤로가기" />} />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
