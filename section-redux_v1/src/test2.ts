interface DiaryDto {
  id: number;
  emotionId: number;
}

const diarys: DiaryDto[] = [
  {
    id: 1,
    emotionId: 5,
  },
  {
    id: 7,
    emotionId: 4,
  },
  {
    id: 3,
    emotionId: 2,
  },
];

const maxId = Math.max(...diarys.map((item) => item.id));

console.log(maxId);
