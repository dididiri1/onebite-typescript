const payload = {
  emotionId: 2,
  content: "오늘도 수고했어요!",
  createdDate: 1715050000000,
};

const newId = 3;

const newDiary = { id: newId, ...payload };

console.log(newDiary);
