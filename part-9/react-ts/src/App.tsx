interface HeaderProps {
  name: string;
}

// interface ContentProps {
//   name: string;
//   exerciseCount: number;
// }

interface TotalProps {
  totalExercises: number;
}

interface Description {
  description?: string;
}

interface CoursePartBase extends Description {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePardRequirements extends CoursePartBase {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePardRequirements;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.name}</h1>;
};

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return <Part courseParts={courseParts} />;
};

const Total = (props: TotalProps): JSX.Element => {
  return <div>Number of exercises {props.totalExercises}</div>;
};

const Part = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <>
      {courseParts.map((part, i) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={i}>
                <div>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </div>
                <div>
                  <em>{part.description}</em>
                </div>
                <br />
              </div>
            );

          case "group":
            return (
              <div key={i}>
                <div>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </div>
                <div>project exercises {part.groupProjectCount}</div>
                <br />
              </div>
            );

          case "background":
            return (
              <div key={i}>
                <div>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </div>
                <div>
                  <em>{part.description}</em>
                </div>
                <div>submit to {part.backgroundMaterial}</div>
                <br />
              </div>
            );

          case "special":
            return (
              <div key={i}>
                <div>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </div>
                <div>
                  <em>{part.description}</em>
                </div>
                <div>required skills {part.requirements.join(", ")}</div>
                <br />
              </div>
            );

          default:
            return assertNever(part);
        }
      })}
    </>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
