"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatient = exports.addPatient = exports.getAllPatients = void 0;
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getAllPatients = () => {
    return patients_1.default.map((patient) => makePatientSensative(patient));
};
exports.getAllPatients = getAllPatients;
const getPatient = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (patient) {
        return makePatientSensative(patient);
    }
    return patient;
};
exports.getPatient = getPatient;
const addPatient = (newPatient) => {
    const patient = Object.assign({ id: (0, uuid_1.v1)() }, newPatient);
    patients_1.default.push(patient);
    return makePatientSensative(patient);
};
exports.addPatient = addPatient;
const makePatientSensative = (patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, name, dateOfBirth, gender, occupation } = patient;
    return { id, name, dateOfBirth, gender, occupation };
};
