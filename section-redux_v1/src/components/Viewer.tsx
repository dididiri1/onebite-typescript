import { getEmotionImage } from "../util/get-emotion-image";
import "./Viewer.css";
import { emotionList } from "../util/constants";

interface Props {
  emotionId: number;
  content: string;
}

const Viewer = ({ emotionId, content }: Props) => {
  const emotionItem = emotionList.find((item) => item.emotionId === emotionId);

  if (!emotionItem) {
    return;
  }

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} alt="" />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
