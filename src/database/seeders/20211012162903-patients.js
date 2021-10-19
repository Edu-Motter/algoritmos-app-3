'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Patients",
      [
        {
          name: "Erick Garcia",
          email: "egarcia@gmail.com",
          phone: "123456",
        },
        {
          name: "Eduardo Motter",
          email: "emotter@gmail.com",
          phone: "123456",
        },
        {
          name: "Isabelle Bernieri",
          email: "ibernieri@gmail.com",
          phone: "123456",
        },
        {
          name: "Giu Garcia",
          email: "ggarcia@gmail.com",
          phone: "123456",
        },
        {
          name: "Marcio Garcia",
          email: "mgarcia@gmail.com",
          phone: "123456",
        },
        {
          name: "Elaine Garcia",
          email: "egarcia@gmail.com",
          phone: "123456",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Patients", null, {});
  }
};
