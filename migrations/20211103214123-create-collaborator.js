'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('collaborators', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      collaboratorTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'collaborator_type_id',
        comment: 'Llave foranea de la tabla de collaborator_types',
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
        comment: 'Nombre del Colaborador',
      },
      paternalSurname: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'paternal_surname',
        comment: 'Apellido Paterno del Colaborador',
      },
      maternalSurname: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'maternal_surname',
        comment: 'Apellido Materno del Colaborador',
      },
      phoneNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'phone_number',
        unique: true,
        comment: 'Numero Telefonico del Colaborador',
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Estatus del tipo de colaborador',
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
    },  {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('collaborators');
  },
};