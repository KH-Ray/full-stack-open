export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NoSSNPatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;