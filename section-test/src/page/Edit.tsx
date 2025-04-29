import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { Diary } from "../types";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();

  const data = useContext(DiaryStateContext);

  const [curDiaryItem, setCurDiaryItem] = useState<Diary>();

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentDiaryItem = data?.find(
      (item) => String(item.id) === String(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않은 일기장입니다.2");
      nav("/");
      return;
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

  const onSubmit = () => {};

  return (
    <div>
      <Header
        title="일기 수정하기"
        leftChild={<Button text="< 뒤로가기" onClick={() => nav("/")} />}
        rightChild={<Button text="삭제하기" type="NEGATIVE" />}
      />
      <Editor onSumbit={onSubmit} initData={curDiaryItem} />
    </div>
  );
};

export default Edit;
