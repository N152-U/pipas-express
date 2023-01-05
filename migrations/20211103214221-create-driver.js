'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drivers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      typeDriverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'type_driver_id',
        defaultValue: 1,
        comment: 'Llave foranea de la tabla de driver_types',
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
        comment: 'Nombre del Conductor',
      },
      paternalSurname: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'paternal_surname',
        comment: 'Apellido Paterno del Conductor',
      },
      maternalSurname: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'maternal_surname',
        comment: 'Apellido Materno del Conductor',
      },
      phoneNumber: {
        type: Sequelize.BIGINT,
        allowNull: true,
        unique: true,
        field: 'phone_number',
        comment: 'Numero Telefonico del Conductor',
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Estatus del tipo de Conductor',
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'created_by',
        comment: 'Llave foranea de la tabla users',
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'updated_by',
        comment: 'Llave foranea de la tabla users',
      },
      createdAt:
      {
        type: Sequelize.DATE,
        field: 'created_at'
      },
  
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
      },

    }, {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('drivers');
  },
};