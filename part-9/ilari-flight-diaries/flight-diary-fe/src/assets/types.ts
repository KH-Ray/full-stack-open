export interface Diaries {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiary = Omit<Diaries, "id">;
