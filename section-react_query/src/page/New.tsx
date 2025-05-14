import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { noIdDiary } from "../types";
import usePageTitle from "../hooks/usePageTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiary } from "../api/diaryApi";

const New = () => {
  usePageTitle("새 일기 쓰기");

  const nav = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: noIdDiary) => createDiary(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
      nav("/", { replace: true });
    },
    onError: (error) => {
      console.log("일기 등록 실패:", error);
    },
  });

  const onSubmit = (input: noIdDiary) => {
    mutation.mutate(input);
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
