
 const { DataTypes } = require('sequelize');

 module.exports = (sequelize) => {
   const Capacity = sequelize.define('capacities', {

     name: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
     },
     capacity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
     active: {
       type: DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: true,
       comment: 'Estatus del registro',
     },
     createdBy: {
       type: DataTypes.INTEGER,
       allowNull: false,
       field: 'created_by',
       comment: 'Llave foranea de la tabla users',
     },
     updatedBy: {
       type: DataTypes.INTEGER,
       allowNull: true,
       field: 'updated_by',
       comment: 'Llave foranea de la tabla users',
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
   /*   createdAt: 'created_at',
     updatedAt: 'updated_at', */
   });
 
   return Capacity;
 };
 