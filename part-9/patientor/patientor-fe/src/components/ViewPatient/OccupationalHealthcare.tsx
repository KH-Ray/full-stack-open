import { Diagnoses, OccupationalHealthcareEntry } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnoses[];
}

const OccupationalHealthcare = ({ entry, diagnoses }: Props): JSX.Element => {
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
        <div>{entry.date} 💼</div>
        <div>
          <em>{entry.description}</em>
        </div>
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

export default OccupationalHealthcare;
