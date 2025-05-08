import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";

import { noIdDiary } from "../types";
import usePageTitle from "../hooks/usePageTitle";
import { useDispatch } from "react-redux";
import { AppDisaptch } from "../store";
import { createDiaryThunk } from "../features/diarySlice";

const New = () => {
  const dispatch = useDispatch<AppDisaptch>();

  usePageTitle("새 일기 쓰기");

  const nav = useNavigate();

  const onSubmit = (input: noIdDiary) => {
    dispatch(
      createDiaryThunk({
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
