import express from "express";
import patientService from "../services/patientService";
import util from "../utils";
import patients from "../data/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatient());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient().find((p) => p.id === req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = util.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.query.id;

  try {
    const findPatient = patients.find((patient) => patient.id === id);

    if (!findPatient) throw new Error("Patient not found");

    const newEntry = util.toNewEntries(req.body);
    const addedEntry = patientService.addEntry(findPatient, newEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
