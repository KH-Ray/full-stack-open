import { Diagnoses, HealthCheckEntry } from "../../types";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnoses[];
}

const HealthCheck = ({ entry, diagnoses }: Props): JSX.Element => {
  let heart: string;

  if (entry.healthCheckRating === 0) {
    heart = "💚";
  } else if (entry.healthCheckRating === 1) {
    heart = "💛";
  } else if (entry.healthCheckRating === 2) {
    heart = "💙";
  } else {
    heart = "❤";
  }

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <div key={entry.id}>
        <div>{entry.date} 👨‍⚕️</div>
        <div>
          <em>{entry.description}</em>
        </div>
        <div>{heart}</div>
        <div>diagnose by {entry.specialist}</div>

        <ul>
          {entry?.diagnosisCodes &&
            entry.diagnosisCodes.map((d, i) => {
              const description = diagnoses.find(
                (diagnosis) => diagnosis.code === d
              )?.name;

              return (
                <li key={i}>
                  {d} {description}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default HealthCheck;
