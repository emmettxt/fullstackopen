"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const utils_1 = require("../utils");
const patientRouter = express_1.default.Router();
patientRouter.get("/", (_req, res) => {
    res.send((0, patientService_1.getAllPatients)());
});
patientRouter.post("/", (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = (0, patientService_1.addPatient)(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
patientRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const patient = (0, patientService_1.getPatient)(id);
    if (patient) {
        return res.json(patient);
    }
    return res.sendStatus(404);
});
exports.default = patientRouter;
