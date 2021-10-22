const express = require("express");
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");

physicianRouter.get("/listAllPhysicians", physicianController.listAllPhysicians);
physicianRouter.post("/newPhysician", physicianController.newPhysician);
physicianRouter.delete("/deletePhysician", physicianController.deletePhysician);
physicianRouter.put("/updatePhysician", physicianController.updatePhysician);


module.exports = physicianRouter;
