import express from "express";
import {
  addEntry,
  addPatient,
  getAllPatients,
  getPatient,
} from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(getAllPatients());
});

patientRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = getPatient(id);
  if (patient) {
    return res.send(patient);
  }
  return res.sendStatus(404);
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  const patient = getPatient(id);
  if (!patient) {
    return res.sendStatus(404);
  }
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = addEntry(patient, newEntry);
    return res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default patientRouter;
