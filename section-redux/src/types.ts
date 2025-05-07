export interface Diary {
  id: number;
  emotionId: number;
  content: string;
  createdDate: number;
}

export type noIdDiary = Omit<Diary, "id">;
