import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { noIdDiary } from "../types";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { Diary } from "../types";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const data = useContext(DiaryStateContext);
  const dispatch = useContext(DiaryDispatchContext);
  const [curDiaryItem, setCurDiaryItem] = useState<Diary>();

  useEffect(() => {
    if (!data) return;

    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

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
        rightChild={<Button text="삭제하기" onClick={onClickDelete} />}
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
