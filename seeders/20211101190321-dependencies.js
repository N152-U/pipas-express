
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('dependencies', [
      {
        id: 1,
        name: "Rentada",
        active: true,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "SACMEX",
        active: true,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "No especifica",
        active: true,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
     
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dependencies', null, {});
  },
};
