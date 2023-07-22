const course = "Half Stack application development";
const part1 = "Fundamentals of React";
const excercises1 = 10;
const part2 = "Using props to pass data";
const excercises2 = 7;
const part3 = "State of a component";
const excercises3 = 14;

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.excercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={part1} excercises={excercises1} />
      <Part part={part2} excercises={excercises2} />
      <Part part={part3} excercises={excercises3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of excercises{" "}
      {props.excercises1 + props.excercises2 + props.excercises3}
    </p>
  );
};

const App = () => {
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total
        excercises1={excercises1}
        excercises2={excercises2}
        excercises3={excercises3}
      />
    </div>
  );
};

export default App;
