'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('collaborators_has_settlements', {
      collaboratorId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        field: 'collaborator_id',
        comment: 'Llave foranea de la tabla permissions',
      },
    settlementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        field: 'settlement_id',
        comment: 'Llave foranea de la tabla de setllements',
      },
    }, {
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('collaborators_has_settlements');
  }
};