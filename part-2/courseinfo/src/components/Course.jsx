const Course = ({ courses }) => {
  return courses.map((course) => {
    return (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  });
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  const parts = props.parts;

  return parts.map((el, i) => (
    <p key={i}>
      {el.name} {el.exercises}
    </p>
  ));
};

const Total = (props) => {
  const parts = props.parts;

  return (
    <p>
      <strong>
        total of {parts.reduce((acc, curVal) => acc + curVal.exercises, 0)}{" "}
        excercises
      </strong>
    </p>
  );
};

export default Course;
