export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatient = Omit<Patient, "id">;

export type NonSensativePatient = Omit<Patient, "ssn" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export enum EntryType {
  HealthCheck = "Health Check",
  Hospital = "Hospital",
  OccupationalHealthcare = "Occupational Healthcare",
}
interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: { date: string; criteria: string };
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// ---------------------------------------------------------------------------------------------------------------------------------------
// By: Andrii Dieiev
// From: https://github.com/microsoft/TypeScript/issues/39556#issuecomment-656925230
type BetterOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// ---------------------------------------------------------------------------------------------------------------------------------------

export type NewEntry = BetterOmit<Entry, "id">;
