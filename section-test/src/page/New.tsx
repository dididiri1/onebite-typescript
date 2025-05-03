import { useContext } from "react";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { noIdDiary } from "../types";
import { DiaryDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

const New = () => {
  const dispatch = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input: noIdDiary) => {
    dispatch?.onCreate(input.createdDate, input.emotionId, input.content);
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
