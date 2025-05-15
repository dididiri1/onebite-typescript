import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { Diary, noIdDiary } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDiary,
  deletediary,
  fetchDiary,
  updateDiary,
} from "../api/diaryApi";

const Edit = () => {
  const params = useParams();

  const nav = useNavigate();

  const queryClient = useQueryClient();

  // const cached = queryClient
  //   .getQueryData<Diary[]>(["diaries"])
  //   ?.find((item) => Number(item.id) === Number(params.id));

  const { data, isLoading, error } = useQuery<Diary>({
    queryKey: ["diary", params.id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const res = await fetchDiary(Number(id));
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: noIdDiary }) =>
      updateDiary(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
      nav("/", { replace: true });
    },
    onError: (error) => {
      console.log("일기 등록 실패:", error);
    },
  });

  const onSubmit = (input: noIdDiary) => {
    if (window.confirm("일기를 수정 하겠습니까?")) {
      createMutation.mutate({ id: Number(params.id), data: input });
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletediary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
      nav("/", { replace: true });
    },
    onError: (error) => {
      console.log("일기 삭제 실패:", error);
    },
  });

  const onClickDelete = () => {
    if (window.confirm("일기를 삭제 하겠습니까?")) {
      deleteMutation.mutate(Number(params.id));
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) {
    return <div>데이터가 없습니다...</div>;
  }

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav("/")} />}
        rightChild={
          <Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />
        }
      />
      <Editor initData={data} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
