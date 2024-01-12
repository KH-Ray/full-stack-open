import axios from "axios";
import { Diaries, NewDiary } from "./assets/types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
  return axios.get<Diaries[]>(baseUrl).then((res) => res.data);
};

export const createDiary = (object: NewDiary) => {
  return axios.post<Diaries>(baseUrl, object).then((res) => res.data);
};
