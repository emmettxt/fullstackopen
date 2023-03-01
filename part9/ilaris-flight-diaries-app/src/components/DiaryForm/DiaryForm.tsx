import { useState } from "react";
import diaryService from "../../services/diaryService";
import {
  NewDiaryEntry,
  Visibility,
  Weather,
  NonSensitiveDiaryEntry,
} from "../../types";
import "./DiaryForm.css";

const DiaryForm = ({
  appendDiary,
}: {
  appendDiary: (diary: NonSensitiveDiaryEntry) => void;
}) => {
  const [visibility, setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState<string>("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (visibility && weather) {
      const newDiary: NewDiaryEntry = {
        comment,
        weather,
        date,
        visibility,
      };
      const latestDiary = await diaryService.createDiary(newDiary);
      appendDiary(latestDiary);
    }
  };

  return (
    <form className="diary-form" onSubmit={addDiary}>
      <fieldset className="form-radio">
        <legend>Weather</legend>

        {Object.entries(Weather).map(([key, val]) => (
          <div key={key}>
            <label htmlFor={`weather-radio-button-${val}`}>{key}</label>
            <input
              id={`weather-radio-button-${val}`}
              type="radio"
              value={val}
              name="weather"
              checked={weather === val}
              onChange={() => setWeather(val)}
            />
          </div>
        ))}
      </fieldset>
      <fieldset className="form-radio">
        <legend>Visibility</legend>

        {Object.entries(Visibility).map(([key, val]) => (
          <div key={key}>
            <label htmlFor={`visibility-radio-button-${val}`}>{key}</label>
            <input
              id={`visibility-radio-button-${val}`}
              type="radio"
              value={val}
              name="visibility"
              checked={visibility === val}
              onChange={() => setVisibility(val)}
            />
          </div>
        ))}
      </fieldset>
      <div className="form-item">
        <label htmlFor={"date-input"}>Date</label>
        <input
          type={"date"}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div className="form-item">
        <label>comment</label>
        <input
          name="comment"
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default DiaryForm;
