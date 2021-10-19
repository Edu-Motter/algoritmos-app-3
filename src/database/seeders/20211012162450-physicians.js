'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Physicians",
      [
        {
          name: "Luis Jaquetto",
          email: "jqtt@gmail.com",
          password: "123",
        },
        {
          name: "Rita Lobo",
          email: "rlobo@gmail.com",
          password: "123",
        },
        {
          name: "Sulino Silva",
          email: "ssilva@gmail.com",
          password: "123",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete("Physicians", null, {});
  
  },
};
