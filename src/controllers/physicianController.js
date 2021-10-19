const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.get("/listAllAppointments", appointmentController.listAllAppointments);

module.exports = appointmentRouter;