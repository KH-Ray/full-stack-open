import { useParams } from "react-router-dom";
import { Patient } from "../../types";

interface Props {
  patients: Patient[];
}

type PatientParams = {
  id: string;
};

const ViewPatient = ({ patients }: Props): JSX.Element => {
  const { id } = useParams<PatientParams>();
  const findPatient: Patient | undefined = patients.find((p) => p.id === id);

  if (!findPatient) return <h1>Person not found</h1>;

  return (
    <div>
      <h1>
        {findPatient.name}{" "}
        {findPatient.gender === "male" ? <span>🚹</span> : <span>🚺</span>}
      </h1>

      <div>ssn: {findPatient.ssn}</div>
      <div>occupation: {findPatient.occupation}</div>
    </div>
  );
};

export default ViewPatient;
