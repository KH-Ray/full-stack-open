import { useParams } from "react-router-dom";
import { Diagnoses, Entry, Patient } from "../../types";
import { assertNever } from "../../utils";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import { Button } from "@mui/material";

interface Props {
  patients: Patient[];
  diagnoses: Diagnoses[];
}

type PatientParams = {
  id: string;
};

const EntryDetails = (entry: Entry, diagnoses: Diagnoses[]): JSX.Element => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;

    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;

    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;

    default:
      return assertNever(entry);
  }
};

const ViewPatient = ({ patients, diagnoses }: Props): JSX.Element => {
  const { id } = useParams<PatientParams>();
  const findPatient: Patient | undefined = patients.find((p) => p.id === id);

  if (!findPatient)
    return <h1 style={{ fontFamily: "Roboto" }}>Person not found</h1>;

  return (
    <div style={{ fontFamily: "Roboto" }}>
      <div>
        <h1>
          {findPatient.name}{" "}
          {findPatient.gender === "male" ? (
            <span>🚹</span>
          ) : findPatient.gender === "female" ? (
            <span>🚺</span>
          ) : (
            <span>🚻</span>
          )}
        </h1>
        <div>ssn: {findPatient.ssn}</div>
        <div>occupation: {findPatient.occupation}</div>
      </div>

      <div>
        <h2>entries</h2>
        {findPatient.entries.map((e) => {
          return <div key={e.id}>{EntryDetails(e, diagnoses)}</div>;
        })}
      </div>

      <Button variant="contained" color="primary">
        Add New Entry
      </Button>
    </div>
  );
};

export default ViewPatient;
