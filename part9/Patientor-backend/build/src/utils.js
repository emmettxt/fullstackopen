"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("./types");
const toNewPatient = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
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
exports.toNewPatient = toNewPatient;
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Name missing or incorrect type");
    }
    return name;
};
const parseSsn = parseName;
const parseOccupation = parseName;
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Name missing or incorrect type");
    }
    return gender;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(gender);
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Name missing or incorrect type");
    }
    return dateOfBirth;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
