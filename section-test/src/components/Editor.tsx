import { useEffect, useState } from "react";
import "./Editor.css";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/constants";
import { useNavigate } from "react-router-dom";
import { Diary, noIdDiary } from "../types";

interface Props {
  onSumbit: (input: noIdDiary) => void;
  initData?: Diary;
}

const Editor = ({ onSumbit, initData }: Props) => {
  const nav = useNavigate();

  const [input, setInput] = useState({
    createdDate: new Date().getTime(),
    emotionId: 3,
    content: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({ ...initData });
    }
  }, [initData]);

  const getStringedDate = (createdDate: number) => {
    return new Date(createdDate).toISOString().split("T")[0];
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput((input) => ({
      ...input,
      [name]: name === "createdDate" ? new Date(value).getTime() : value,
    }));
  };

  const handleEmotionCheck = (emotionId: number) => {
    setInput((prev) => ({
      ...prev,
      emotionId,
    }));
  };

  const onSumbitButton = () => {
    onSumbit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h2>오늘의 날짜</h2>
        <input
          type="date"
          name="createdDate"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion_section">
        <h2>오늘의 감정</h2>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => {
            return (
              <EmotionItem
                onClick={() => handleEmotionCheck(item.emotionId)}
                key={item.emotionId}
                {...item}
                isSelected={item.emotionId === input.emotionId}
              />
            );
          })}
        </div>
      </section>
      <section className="content_section">
        <h2>오늘의 일기</h2>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        ></textarea>
      </section>
      <section className="button_section">
        <Button text="취소하기" onClick={() => nav("/")}></Button>
        <Button
          text="작성하기"
          type="POSITIVE"
          onClick={onSumbitButton}
        ></Button>
      </section>
    </div>
  );
};

export default Editor;
