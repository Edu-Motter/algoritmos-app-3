const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.post("/newAppointment", appointmentController.newAppointment);
appointmentRouter.delete("/deleteAppointment", appointmentController.deleteAppointment);

appointmentRouter.get("/listAllAppointments", appointmentController.listAllAppointments);
appointmentRouter.get("/searchAppointmentByPatientId", appointmentController.findAppointmentByPatientId);
appointmentRouter.get("/searchAppointmentByPhysicianId", appointmentController.findAppointmentByPhysicianId);

module.exports = appointmentRouter;