const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RoleHasPermission = sequelize.define('roles_has_permissions', {
    roleId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      field: 'role_id',
      comment: 'Llave foranea de la tabla roles',
    },
    permissionId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      field: 'permission_id',
      comment: 'Llave foranea de la tabla permissions',
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false
    
  });

  return RoleHasPermission;
};
