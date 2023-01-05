'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles_has_permissions', {
      roleId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'role_id',
        comment: 'Llave foranea de la tabla roles',
      },
      permissionId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'permission_id',
        comment: 'Llave foranea de la tabla permissions',
      },
    }, {
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles_has_permissions');
  }
};