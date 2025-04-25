import { useState } from "react";
import "./Editor.css";
import { format } from "date-fns";

const Editor = () => {
  const [input, setInput] = useState({
    createdDate: new Date().getTime(),
    emotionId: 3,
    content: "",
  });

  const getStringedDate = (createdDete: number) => {
    return format(new Date(createdDete), "yyyy-mm-dd");
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h2>오늘의 날짜</h2>
        <input
          type="date"
          name="createdDate"
          value={getStringedDate(input.createdDate)}
        />
      </section>
      <section className="img_section">
        <h2>오늘의 감정</h2>
      </section>
      <section className="content_section">
        <h2>오늘의 일기</h2>
        <textarea className=""></textarea>
      </section>
    </div>
  );
};

export default Editor;
