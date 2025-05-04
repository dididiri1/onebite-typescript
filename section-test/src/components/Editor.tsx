import "./Editor.css";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/constants";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { noIdDiary } from "../types";
import { Diary } from "../types";

interface Props {
  onSubmit: (input: noIdDiary) => void;
  initData?: Diary;
}

const Editor = ({ onSubmit, initData }: Props) => {
  const [input, setInput] = useState({
    createdDate: new Date().getTime(),
    emotionId: 3,
    content: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
      });
    }
  }, [initData]);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((prev) => ({
      ...prev,
      [name]: name === "createdDate" ? new Date(value).getTime() : value,
    }));
  };

  const getStringedDate = (createdDate: number) => {
    return new Date(createdDate).toISOString().split("T")[0];
  };

  const handelEmotionCheck = (emotionId: number) => {
    setInput((prev) => ({
      ...prev,
      emotionId,
    }));
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h2>오늘의 날짜</h2>
        <input
          type="date"
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
        />
      </section>
      <section className="emotion_section">
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => {
            return (
              <EmotionItem
                onClick={() => handelEmotionCheck(item.emotionId)}
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
        ></textarea>
      </section>
      <section className="button_section">
        <Button text="취소하기" onClick={() => nav("/")} />
        <Button text="작성하기" type="POSITIVE" onClick={onClickSubmitButton} />
      </section>
    </div>
  );
};

export default Editor;
