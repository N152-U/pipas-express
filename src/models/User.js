const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Role } = require('.');

const SALT_WORK_FACTOR = 10;
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'role_id'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        try {
          const hash = bcrypt.hashSync(value, SALT_WORK_FACTOR);
          this.setDataValue('password', hash);
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'middle_name'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login',
      /* comment: 'Ultimo inicio de sesion', */
    },
    ipLogin: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ip_login'
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Estatus del usuario',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by',
      /* comment: 'Llave foranea de la tabla users', */
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_by',
      /* comment: 'Llave foranea de la tabla users', */
    },
    createdAt: {
      type: DataTypes.DATE ,
      allowNull: false,
    
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE ,
      allowNull: false,
    
      field: 'updated_at'
    },
  }, {
    freezeTableName: true,
    timestamps: true,
   /*  createdAt: 'created_at',
    updatedAt: 'updated_at' */
  });
  User.associate = function (models) {
    //1:1
    User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'roles' });
  };
  return User;
};
