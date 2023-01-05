'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drivers_has_vehicles', {
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'driver_id',
        comment: 'Llave foranea de la tabla de drivers',
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'vehicle_id',
        comment: 'Llave foranea de la tabla de vehicles',
      },
    },{
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('drivers_has_vehicles');
  },
};
