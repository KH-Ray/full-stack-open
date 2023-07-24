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
      <Part part={props.part1} excercises={props.excercises1} />
      <Part part={props.part2} excercises={props.excercises2} />
      <Part part={props.part3} excercises={props.excercises3} />
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
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        excercises: 10,
      },
      {
        name: "Using props to pass data",
        excercises: 7,
      },
      {
        name: "State of a component",
        excercises: 14,
      },
    ],
  };
  const [part1, part2, part3] = course.parts;

  return (
    <div>
      <Header course={course.name} />
      <Content
        part1={part1.name}
        excercises1={part1.excercises}
        part2={part2.name}
        excercises2={part2.excercises}
        part3={part3.name}
        excercises3={part3.excercises}
      />
      <Total
        excercises1={part1.excercises}
        excercises2={part2.excercises}
        excercises3={part3.excercises}
      />
    </div>
  );
};

export default App;
