import { useEffect, useState } from "react";
import { Diaries } from "./assets/types";
import { createDiary, getAllDiaries } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
    setReloadPage(false);
  }, [reloadPage]);

  return (
    <div>
      <h1>Add new entry</h1>
      <p style={{ color: "red" }}>{error}</p>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          createDiary({
            date: date,
            weather: weather,
            visibility: visibility,
            comment: comment,
          })
            .then((data) => {
              setDiaries([...diaries, data]);
              setReloadPage(true);

              setDate("");
              setVisibility("");
              setWeather("");
              setComment("");
            })
            .catch((err) => {
              console.error(err);
              setError(err.response.data);
              setTimeout(() => {
                setError("");
              }, 5000);
            });
        }}
      >
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility:{" "}
          <span>
            <input
              type="radio"
              id="great"
              name="visibility"
              value="great"
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="great">great</label>
          </span>
          <span>
            <input
              type="radio"
              id="good"
              name="visibility"
              value="good"
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="good">good</label>
          </span>
          <span>
            <input
              type="radio"
              id="ok"
              name="visibility"
              value="ok"
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="ok">ok</label>
          </span>
          <span>
            <input
              type="radio"
              id="poor"
              name="visibility"
              value="poor"
              onChange={(e) => setVisibility(e.target.value)}
            />
            <label htmlFor="poor">poor</label>
          </span>
        </div>
        <div>
          weather:{" "}
          <span>
            <input
              type="radio"
              id="sunny"
              name="weather"
              value="sunny"
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="sunny">sunny</label>
          </span>
          <span>
            <input
              type="radio"
              id="rainy"
              name="weather"
              value="rainy"
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="rainy">rainy</label>
          </span>
          <span>
            <input
              type="radio"
              id="cloudy"
              name="weather"
              value="cloudy"
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="cloudy">cloudy</label>
          </span>
          <span>
            <input
              type="radio"
              id="stormy"
              name="weather"
              value="stormy"
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="stormy">stormy</label>
          </span>
          <span>
            <input
              type="radio"
              id="windy"
              name="weather"
              value="windy"
              onChange={(e) => setWeather(e.target.value)}
            />
            <label htmlFor="windy">windy</label>
          </span>
        </div>
        <div>
          comment:{" "}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h1>Diary entries</h1>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
