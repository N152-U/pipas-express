'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trips', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      folio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        comment: 'Primer folio del viaje',
      },
      folio2: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        comment: 'Segundo folio del viaje',
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'driver_id',
        comment: 'Llave foranea de la tabla de drivers',
      },
      collaboratorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'collaborator_id',
        comment: 'Llave foranea de la tabla de collaborators',
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Calle del viaje',
      },
      round: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Viaje o Ronda actual de la Pipa',
      },
      authorize: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Apolonio Toxtlec',
        comment: 'Nombre de quien autoriza',
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'status_id',
        comment: 'Llave foranea de la tabla statuses',
      },
      waterIntakeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'water_intake_id',
        comment: 'Llave foranea de la tabla water_intake',
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Viaje Activo o Inactivo',
      },
      assignedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'assigned_by',
      },
      assignedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'assigned_at',
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
    },{
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('trips');
  },
};