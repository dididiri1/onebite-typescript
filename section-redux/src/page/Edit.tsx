import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import { Diary, noIdDiary } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteDiary, updateDiary } from "../features/diary/diarySlice";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const [curDiaryItem, setCurDiaryItem] = useState<Diary>();

  const dispatch = useDispatch<AppDispatch>();
  const { diaries, isLoading } = useSelector((state: RootState) => state.diary);

  useEffect(() => {
    if (isLoading) return;

    const currentDiaryItem = diaries.find(
      (item) => String(item.id) === String(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/");
      return;
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      dispatch(deleteDiary(Number(params.id)));
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input: noIdDiary) => {
    if (window.confirm("일기를 수정하겠습니까?")) {
      dispatch(
        updateDiary({
          id: Number(params.id),
          ...input,
        })
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
