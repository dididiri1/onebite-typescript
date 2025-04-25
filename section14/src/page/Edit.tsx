import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useDiaryDispatch } from "../App";
import useDiary from "../hooks/useDiary";
import { noIdDiary } from "../types";

const Edit = () => {
  const params = useParams();
  const { onUpdate, onDelete } = useDiaryDispatch();
  const nav = useNavigate();

  const diaryId = params.id ? Number(params.id) : null;

  const curDiaryItem = useDiary(Number(diaryId));

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(Number(params.id));
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input: noIdDiary) => {
    console.log(input.createdDate);
    if (window.confirm("일기를 수정하겠습니까?")) {
      onUpdate(
        Number(params.id),
        input.createdDate,
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav("/")} />}
        rightChild={
          <Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
