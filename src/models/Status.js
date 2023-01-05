/**
 * RoleService
 * @module src/models/Status
 * @name Status
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
 const { DataTypes } = require('sequelize');

 module.exports = (sequelize) => {
   const Status = sequelize.define('statuses', {

     name: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Nombre del estatus',
       unique: true,
     },
     active: {
       type: DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: true,
       comment: 'Estatus del role',
     },
     createdBy: {
       type: DataTypes.INTEGER,
       allowNull: false,
       field: 'created_by',
       comment: 'Creador del estatus',
     },
     updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'updated_by',
      comment: 'Editor del estatus',
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
     /* createdAt: 'created_at',
     updatedAt: 'updated_at', */
   });
 return Status;
};
