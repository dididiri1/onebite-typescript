import "./DiaryItem.css";
import Button from "./Button";
import { getEmotionImage } from "../util/get-emotion-image";
import { useNavigate } from "react-router-dom";
import { Diary } from "../types";

interface Props extends Diary {}

const DiaryItem = ({ id, createdDate, emotionId, content }: Props) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <section className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} alt="" />
      </section>
      <section className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </section>
      <section className="button_section">
        <Button
          text="수정하기"
          onClick={() => {
            nav(`/edit/${id}`);
          }}
        />
      </section>
    </div>
  );
};

export default DiaryItem;
