import { NonSensitiveDiaryEntry } from "../types";
import "./Diaries.css";

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <div className="diary-list-item">
      <h3 className="diary-list-item-date">{diary.date}</h3>
      <div className="diary-list-item-visibility">
        Visibility: {diary.visibility}
      </div>
      <div className="diary-list-item-weather">Weather: {diary.weather}</div>
    </div>
  );
};

const Diaries = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) => {
  return (
    <>
      <h2 className="diaries-header">Diary Entries</h2>
      <div className="diaries">
        {diaries.map((diary) => (
          <Diary diary={diary} key={diary.id} />
        ))}
      </div>
    </>
  );
};

export default Diaries;
