import { useState } from "react";

const Button = ({ value, handleClick, text }) => {
  return <button onClick={() => handleClick(value + 1)}>{text}</button>;
};
const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{text === "positive" ? `${value} %` : value}</td>
      </tr>
    </tbody>
  );
};

const Statictics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good + -bad) / all;
  const positive = (good / all) * 100;

  if (good !== 0 || bad !== 0 || neutral !== 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </table>
      </>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button value={good} handleClick={setGood} text="good" />
      <Button value={neutral} handleClick={setNeutral} text="neutral" />
      <Button value={bad} handleClick={setBad} text="bad" />

      <Statictics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
