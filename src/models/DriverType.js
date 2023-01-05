/**
 * TypeDriverService
 * @module src/models/TypeDriver
 * @name TypeDriver
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DriverType = sequelize.define('driver_types', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Estatus del tipo de Conductor',
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
   /*  createdAt: 'created_at',
    updatedAt: 'updated_at', */
  });

  return DriverType;
};
