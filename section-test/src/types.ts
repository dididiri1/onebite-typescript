export interface Diary {
  id: number;
  createdDate: number;
  emotionId: number;
  content: string;
}

export type noIdDiary = Omit<Diary, "id">;
