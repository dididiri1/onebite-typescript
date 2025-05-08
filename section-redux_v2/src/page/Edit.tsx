import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useEffect } from "react";
import { noIdDiary } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  deleteDiaryThunk,
  fetchDiaryThunk,
  updateDiaryThunk,
} from "../features/diarySlice";

const Edit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedDiary, isLoading, error } = useSelector(
    (state: RootState) => state.diary
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDiaryThunk(Number(id)));
    }
  }, [id, dispatch]);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      dispatch(deleteDiaryThunk(Number(id)));
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input: noIdDiary) => {
    if (window.confirm("일기를 수정하겠습니까?")) {
      dispatch(updateDiaryThunk({ id: Number(id), data: input }));
      nav("/", { replace: true });
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;
  if (!selectedDiary) return <div>일기를 찾을 수 없습니다.</div>;

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav("/")} />}
        rightChild={
          <Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />
        }
      />
      <Editor initData={selectedDiary} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
