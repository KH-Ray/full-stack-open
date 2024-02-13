import patient from "../data/patients";
import { Patient, NoSSNPatient, NewPatient, NewEntry, Entry } from "../types";
import { v1 as uuid } from "uuid";

const id = uuid();

const patientDatas: Patient[] = patient;

const getPatient = (): Patient[] => {
  return patient;
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

const addEntry = (findPatient: Patient, newEntry: NewEntry): NewEntry => {
  const entry = {
    id,
    ...newEntry,
    type: "HealthCheck",
    healthCheckRating: 0,
  };

  findPatient.entries.push(entry);
  return entry;
};

export default {
  getPatient,
  getNoSSNPatient,
  addPatient,
  addEntry,
};
