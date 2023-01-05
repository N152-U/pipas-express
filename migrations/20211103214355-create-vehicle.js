'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vehicleTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'vehicle_type_id',
        comment: 'Llave foranea de la tabla de vehicle_types',
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Marca del Vehiculo',
      },
      model: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Modelo de vehiculo',
      },
      placa: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Placa del vehiculo',
      },
      eco: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Numero economico del Vehiculo',
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Capacidad del vehiculo',
      },
      dependencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'dependency_id',
        comment: 'Llave foranea de la tabla de dependencies',
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Estatus del vehiculo',
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
    await queryInterface.dropTable('vehicles');
  },
};