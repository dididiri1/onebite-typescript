import { useState } from "react";
import "./Editor.css";
import EmotionItem from "./EmotionItem";

interface DiaryEntry {
  createdDate: Date;
  emotionId: number;
  content: string;
}

const emotionList = [
  { emotionId: 1, emotionName: "완전 좋음" },
  { emotionId: 2, emotionName: "좋음" },
  { emotionId: 3, emotionName: "그러저럭" },
  { emotionId: 4, emotionName: "나쁨" },
  { emotionId: 5, emotionName: "끔찍함" },
];

const Editor = () => {
  const [input, setInput] = useState<DiaryEntry>({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput((input) => ({
      ...input,
      [name]: name === "createdDate" ? new Date(value) : value,
    }));
  };

  const getStringedDate = (targetDate: Date): string => {
    const year = String(targetDate.getFullYear());
    let month = String(targetDate.getMonth() + 1).padStart(2, "0");
    let date = String(targetDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  };

  const handleEmotionClick = (emotionId: number) => {
    setInput((prev) => ({
      ...prev,
      emotionId,
    }));
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
        <textarea placeholder="오늘은 어땟나요?" />
      </section>
      <section className="button_section"></section>
    </div>
  );
};

export default Editor;
