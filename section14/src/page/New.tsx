import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useDiaryDispatch } from "../App";
import { noIdDiary } from "../types";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const dispatch = useDiaryDispatch();

  usePageTitle("새 일기 쓰기");

  const nav = useNavigate();

  const onSubmit = (input: noIdDiary) => {
    dispatch.onCreate(input.createdDate, input.emotionId, input.content);
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
