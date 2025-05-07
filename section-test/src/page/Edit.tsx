import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { RootState, AppDispatch } from "../store";
import { noIdDiary } from "../types";
import { useEffect } from "react";
import {
  updateDiaryThunk,
  fetchDiaryThunk,
} from "../features/diary/diarySlice";

const Edit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const { id } = useParams();

  const { currentDiary, isLoading, error } = useSelector(
    (state: RootState) => state.diary
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDiaryThunk(Number(id)));
    }
  }, [dispatch, id]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;
  if (!currentDiary) return <div>일기를 찾을 수 없습니다.</div>;

  const onSubmit = (input: noIdDiary) => {
    if (window.confirm("일기를 수정하겠습니까?")) {
      dispatch(updateDiaryThunk({ id: Number(id), data: input }));
      nav("/");
    }
  };

  return (
    <div>
      <Header title="일기 수정하기" leftChild={<Button text="< 뒤로가기" />} />
      <Editor initData={currentDiary} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
