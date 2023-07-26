import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={props.handleGood} text="good" />
      <Button handleClick={props.handleNeutral} text="neutral" />
      <Button handleClick={props.handleBad} text="bad" />

      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.avg} />
        <StatisticLine text="positive" value={props.pos} />
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [pos, setPos] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);

    const updatedAll = all + 1;
    setAll(updatedAll);
    setAvg((updatedGood - bad) / updatedAll);
    setPos((updatedGood / updatedAll) * 100);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);

    const updatedAll = all + 1;
    setAll(updatedAll);
    setAvg((good - bad) / updatedAll);
    setPos((good / updatedAll) * 100);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(bad + 1);

    const updatedAll = all + 1;
    setAll(updatedAll);
    setAvg((good - updatedBad) / updatedAll);
    setPos((good / updatedAll) * 100);
  };

  return (
    <Statistics
      handleGood={handleGood}
      handleNeutral={handleNeutral}
      handleBad={handleBad}
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      avg={avg}
      pos={pos}
    />
  );
};

export default App;
