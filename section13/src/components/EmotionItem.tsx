import { getEmotionImage } from "../util/get-emotion-image";
import "./EmotionItem.css";

interface Props {
  emotionId: number;
  emotionName: string;
  isSelected: boolean;
}

const EmotionItem = ({ emotionId, emotionName, isSelected }: Props) => {
  return (
    <div
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ""
      }`}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} alt="" />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
