const Sequelize = require("sequelize");
const dbconfig = require("./config/dbconfig");

const Patient = require("../models/Patient");
const Physician = require("../models/Physician");
const Appointment = require("../models/Appointment");

const connection = new Sequelize(dbconfig);

//Inicianlizando os models:
Patient.init(connection);
Physician.init(connection);
Appointment.init(connection);

//Definindo os relacionamentos entre os models:
Patient.associate(connection.models);
Physician.associate(connection.models);
Appointment.associate(connection.models);

console.log("Models started!");

module.exports = connection;