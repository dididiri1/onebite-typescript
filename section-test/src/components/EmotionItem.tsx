import "./EmotionItem.css";
import { Emotion } from "../util/constants";
import { getEmotionImage } from "../util/get-emotion-image";

interface Props {
  emotionId: number;
  emotionName: string;
  onClick: () => void;
  isSelected: boolean;
}

const EmotionItem = ({
  emotionId,
  emotionName,
  onClick,
  isSelected,
}: Props) => {
  return (
    <div
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ""
      }`}
      onClick={onClick}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} alt="" />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
