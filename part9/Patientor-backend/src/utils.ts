import data from "../data/diagnoses";
import {
  Diagnosis,
  EntryType,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
} from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Name missing or incorrect type");
  }
  return name;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("ssn missing or incorrect type");
  }
  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("ssn missing or incorrect type");
  }
  return occupation;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Name missing or incorrect type");
  }
  return gender;
};
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Name missing or incorrect type");
  }
  return dateOfBirth;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseEntryType = (type: unknown): EntryType => {
  if (type && isString(type) && isEntryType(type)) return type;
  throw new Error("Type missing or incorrect type");
};

const isEntryType = (type: string): type is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(type);
};
const parseDescription = (description: unknown): string => {
  if (description && isString(description)) return description;
  throw new Error("Type missing or incorrect type");
};
const isNumber = (n: unknown): n is number => {
  return typeof n === "number";
};
const parseSpecialist = (specialist: unknown): string => {
  if (specialist && isString(specialist)) return specialist;
  throw new Error("Specialist missing or incorrect type");
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    (rating || rating === 0) &&
    isNumber(rating) &&
    isHealthCheckRating(rating)
  )
    return rating;
  throw new Error("HealthCheckRating missing or incorrect type");
};
const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return (
    Object.values(HealthCheckRating)
      // .map((v) => v.toString())
      .includes(rating)
  );
};

const parseCriteria = (c: unknown): string => {
  if (c && isString(c)) return c;
  throw new Error("Criteria missing or incorrect type");
};

const parseEmployerName = (employerName: unknown): string => {
  if (employerName && isString(employerName)) return employerName;
  throw new Error("employerName missing or incorrect type");
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Missing data: discharge is required");
  }
  if (!("date" in discharge)) {
    throw new Error("Missing data: discharge date is required");
  }
  if (!("criteria" in discharge)) {
    throw new Error("Missing data: discharge criteria is required");
  }

  return {
    date: parseDateOfBirth(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};
const parseSickLeave = (
  discharge: unknown
): { startDate: string; endDate: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Missing data: sickleave is required");
  }
  if (!("startDate" in discharge)) {
    throw new Error("Missing data: sickleave startDate is required");
  }
  if (!("endDate" in discharge)) {
    throw new Error("Missing data: sickleave endDate is required");
  }

  return {
    startDate: parseDateOfBirth(discharge.startDate),
    endDate: parseDateOfBirth(discharge.endDate),
  };
};

const isDiagnosisCode = (
  diagnosisCode: string
): diagnosisCode is Diagnosis["code"] => {
  return data.map(({ code }) => code).includes(diagnosisCode);
};

const parseDiagnosisCode = (diagnosisCode: unknown): Diagnosis["code"] => {
  if (
    diagnosisCode &&
    isString(diagnosisCode) &&
    isDiagnosisCode(diagnosisCode)
  )
    return diagnosisCode;
  throw new Error("Diagnosis code is not a valid code");
};
const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
  if (!Array.isArray(diagnosisCodes))
    throw new Error("diagnosisCodes must be an array");
  return diagnosisCodes.map((d) => parseDiagnosisCode(d));
};
export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    !(
      "type" in object &&
      "description" in object &&
      "date" in object &&
      "specialist" in object
    )
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const newEntry = {
    type: parseEntryType(object.type),
    description: parseDescription(object.description),
    date: parseDateOfBirth(object.date),
    specialist: parseSpecialist(object.specialist),
    ...("diagnosisCodes" in object && {
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    }),
  };
  const entryType = newEntry.type;
  switch (entryType) {
    case EntryType.HealthCheck:
      if (!("healthCheckRating" in object))
        throw new Error(
          "Incorrect data: field healthCheckRating required for entry type HealthCheck"
        );
      return {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        type: entryType,
      };
    case EntryType.Hospital:
      if (!("discharge" in object))
        throw new Error(
          "Incorrect data: field discharge required for entry type Hospital"
        );
      return {
        ...newEntry,
        discharge: parseDischarge(object.discharge),
        type: entryType,
      };
    case EntryType.OccupationalHealthcare:
      if (!("employerName" in object))
        throw new Error(
          "Incorrect data: field discharge required for entry type Hospital"
        );
      return {
        ...newEntry,
        employerName: parseEmployerName(object.employerName),
        type: entryType,
        ...("sickLeave" in object && {
          sickLeave: parseSickLeave(object.sickLeave),
        }),
      };
    default:
      const never: never = entryType;
      return never;
  }
};
