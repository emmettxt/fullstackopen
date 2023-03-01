import axios from "axios";
import { apiBaseURL } from "../config";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getDiaries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseURL}/diaries`
  );
  return response.data;
};

const createDiary = async (diary: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(
    `${apiBaseURL}/diaries`,
    diary
  );
  return response.data;
};

export default { getDiaries, createDiary };
