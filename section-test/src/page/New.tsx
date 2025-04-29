import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { noIdDiary } from "../types";

const New = () => {
  const nav = useNavigate();

  const dispatch = useContext(DiaryDispatchContext);

  const onSumbit = (input: noIdDiary) => {
    dispatch?.onCreate(input.createdDate, input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        leftChild={<Button text="< 뒤로가기" onClick={() => nav("/")} />}
        title="새 일기 쓰기"
      ></Header>
      <Editor onSumbit={onSumbit}></Editor>
    </div>
  );
};

export default New;
