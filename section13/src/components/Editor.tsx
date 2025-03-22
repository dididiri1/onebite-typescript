import { useEffect, useState } from "react";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import { Diary, noIdDiary } from "../types";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const emotionList = [
  { emotionId: 1, emotionName: "완전 좋음" },
  { emotionId: 2, emotionName: "좋음" },
  { emotionId: 3, emotionName: "그러저럭" },
  { emotionId: 4, emotionName: "나쁨" },
  { emotionId: 5, emotionName: "끔찍함" },
];

interface Props {
  onSubmit: (input: noIdDiary) => void;
  initData?: Diary;
}

const Editor = ({ initData, onSubmit }: Props) => {
  const nav = useNavigate();

  const [input, setInput] = useState<noIdDiary>({
    createdDate: new Date().getTime(),
    emotionId: 3,
    content: "",
  });

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

    setInput((input) => ({
      ...input,
      [name]: name === "createdDate" ? new Date(value).getTime() : value,
    }));
  };

  const getStringedDate = (createdDate: number): string => {
    //const targetDate = new Date(createdDate);
    //let year = String(targetDate.getFullYear());
    //let month = String(targetDate.getMonth() + 1).padStart(2, "0");
    //let date = String(targetDate.getDate()).padStart(2, "0");

    //return `${year}-${month}-${date}`;

    return new Date(createdDate).toISOString().split("T")[0];
  };

  const handleEmotionClick = (emotionId: number) => {
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
        <h4>오늘의 날짜</h4>
        <input
          type="date"
          name="createdDate"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() => handleEmotionClick(item.emotionId)}
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땟나요?"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onClickSubmitButton}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
