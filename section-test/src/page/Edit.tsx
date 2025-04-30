import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { noIdDiary } from "../types";
import useDiary from "../hooks/useDiary";

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
    }

    nav("/", { replace: true });
  };

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요.")) {
      dispatch?.onDelete(Number(params.id));
    }

    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title="일기 수정하기"
        leftChild={<Button text="< 뒤로가기" onClick={() => nav("/")} />}
        rightChild={
          <Button text="삭제하기" type="NEGATIVE" onClick={onClickDelete} />
        }
      />
      <Editor onSumbit={onSubmit} initData={curDiaryItem} />
    </div>
  );
};

export default Edit;
