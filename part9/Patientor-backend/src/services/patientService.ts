import data from "../../data/patients";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensativePatient,
  Patient,
} from "../types";
import { v1 as uuid } from "uuid";
const getAllPatients = (): NonSensativePatient[] => {
  return data.map((patient) => makePatientSensative(patient));
};

const getPatient = (id: string): Patient | undefined => {
  return data.find((p) => p.id === id);
};

const addPatient = (newPatient: NewPatient): NonSensativePatient => {
  const patient = { id: uuid(), ...newPatient };
  data.push(patient);
  return makePatientSensative(patient);
};

const makePatientSensative = (patient: Patient): NonSensativePatient => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  return { id, name, dateOfBirth, gender, occupation };
};

const addEntry = (patient: Patient, newEntry: NewEntry) => {
  const entry: Entry = { id: uuid(), ...newEntry };
  patient.entries.push(entry);
  return entry;
};

export { getAllPatients, addPatient, getPatient, addEntry };
