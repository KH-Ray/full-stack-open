import patient from "../data/patients";
import { Patient, NoSSNPatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const id = uuid();

const patientDatas: Patient[] = patient;

const getPatient = (): Patient[] => {
  return patient.map((p) => ({
    ...p,
    entries: [],
  }));
};

const getNoSSNPatient = (): NoSSNPatient[] => {
  return patient.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id,
    ...patient,
  };

  patientDatas.push(newPatient);
  return newPatient;
};

export default {
  getPatient,
  getNoSSNPatient,
  addPatient,
};
