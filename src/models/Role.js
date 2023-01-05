/**
 * DeliveryService
 * @module src/models/Role
 * @name Role
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
 const { DataTypes } = require('sequelize');
 const { v4: uuidv4 } = require('uuid');
 
 module.exports = (sequelize) => {
   const Role = sequelize.define('roles', {
 
   /**
    * Role Model
    * @typedef {Object} module:Role.Role
    * @property {String} role Role Name.
    * @property {Boolean} [active=true] Status of Role (Optional).
    * @property {Timestamp} [timestamps] Timestamps of Role.
    *  Show only when getting  Role (Optional).
    */
 
     role: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
       comment: 'Nombre del rol',
     },
     hash: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     active: {
       type: DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: true,
       comment: 'Estatus del rol',
     },
     createdBy: {
       type: DataTypes.INTEGER,
       allowNull: true,
       field: 'created_by',
    /*    comment: 'Llave foranea de la tabla users', */
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
 /*     createdAt: 'created_at',
     updatedAt: 'updated_at', */
   });
   Role.associate=function(models)
   {
       //1:1
       Role.hasOne(models.User, { foreignKey: 'roleId' });
   };
   return Role;
 };
 