import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { noIdDiary } from "../types";
import useDiary from "../hooks/useDiary";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const dispatch = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(Number(params.id));

  const onSubmit = (input: noIdDiary) => {
    if (window.confirm("일기를 수정하시겠습니까?")) {
      dispatch?.onUpdate(
        Number(params.id),
        input.createdDate,
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  const onClickDelete = () => {
    if (window.confirm("일기를 삭제하시겠습니까~?")) {
      dispatch?.onDelete(Number(params.id));
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title="일기 수정하기"
        leftChild={
          <Button
            text="< 뒤로가기"
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button text="삭제하기" type={"NEGATIVE"} onClick={onClickDelete} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
