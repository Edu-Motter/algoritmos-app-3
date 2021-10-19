const express = require("express");
const appointmentRouter = require("./appointmentRouter");
const patientRouter = require("./patientRouter");
const physicianRouter = require("./physicianRouter");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("It's working");
});

router.use("/appointment", appointmentRouter);
router.use("/patient", patientRouter);
router.use("/physician", physicianRouter);

module.exports = router;