import { useEffect, useState } from "react";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";
import "./App.css";
import Diaries from "./Diaries";
import DiaryForm from "./DiaryForm/DiaryForm";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const appendDiary = (diary: NonSensitiveDiaryEntry) => {
    setDiaries((diaries) => diaries.concat(diary));
  };
  useEffect(() => {
    diaryService.getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <div className="App">
      <DiaryForm appendDiary={appendDiary} />
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
