'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('logs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id'
      },
      registerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'register_id'
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['1', '2' ,'3'],
        comment: 'Género del Promotor (1: Creacion, 2: Edicion, 3: Eliminacion)',
      },
      table: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt:
      {
        type: Sequelize.DATE,
        field: 'created_at'
      },
    }, {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('logs');
  }
};
