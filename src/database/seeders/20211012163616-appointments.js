'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Appointments",
      [
        {
          physicianId: 1,
          patientId: 1,
          appointmentDate: "2021-11-01",
          description: "Consulta emergencial",
        },
        {
          physicianId: 1,
          patientId: 2,
          appointmentDate: "2021-11-01",
          description: "Consulta emergencial",
        },
        {
          physicianId: 2,
          patientId: 3,
          appointmentDate: "2021-11-01",
          description: "Consulta emergencial",
        },
        {
          physicianId: 2,
          patientId: 4,
          appointmentDate: "2021-11-01",
          description: "Consulta emergencial",
        },
        {
          physicianId: 3,
          patientId: 5,
          appointmentDate: "2021-11-01",
          description: "Consulta emergencial",
        },
        {
          physicianId: 3,
          patientId: 6,
          appointmentDate: "2021-11-01",
          description: "Consulta emergencial",
        },

      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Appointments", null, {});

  }
};
