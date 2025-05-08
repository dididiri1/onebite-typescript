import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";

import { noIdDiary } from "../types";
import usePageTitle from "../hooks/usePageTitle";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createDiary } from "../features/diary/diarySlice";

const New = () => {
  const dispatch = useDispatch<AppDispatch>();

  usePageTitle("새 일기 쓰기");

  const nav = useNavigate();

  const onSubmit = (input: noIdDiary) => {
    dispatch(
      createDiary({
        createdDate: input.createdDate,
        emotionId: input.emotionId,
        content: input.content,
      })
    );
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
