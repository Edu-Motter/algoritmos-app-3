const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

patientRouter.get("/listAllPatients", patientController.listAllPatients);
patientRouter.post("/newPatient", patientController.newPatient);
patientRouter.post("/searchPatientByName", patientController.searchPatientByName);
patientRouter.get("/searchPatientByPhysician/:id", patientController.searchPatientByPhysician);
patientRouter.put("/updatePatient", patientController.updatePatient);




module.exports = patientRouter;