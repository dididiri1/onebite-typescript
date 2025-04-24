import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";

const Detail = () => {
  const params = useParams();

  const nav = useNavigate();

  const diaryId = params.id ? Number(params.id) : null;

  const curDiaryItem = useDiary(Number(diaryId));

  if (!curDiaryItem) {
    return <p>일기를 불러오는 중...</p>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;

  const title = getStringedDate(createdDate);
  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button
            text={"< 뒤로 가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Detail;
