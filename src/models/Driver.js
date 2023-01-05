/**
 * DriverService
 * @module src/models/Driver
 * @name Driver
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Driver = sequelize.define('drivers', {
    typeDriverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'type_driver_id',
      defaultValue: 1,
      comment: 'Llave foranea de la tabla de type_drivers',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
      comment: 'Nombre del Conductor',
    },
    paternalSurname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'paternal_surname',
      comment: 'Apellido Paterno del Conductor',
    },
    maternalSurname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'maternal_surname',
      comment: 'Apellido Materno del Conductor',
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'phone_number',
      comment: 'Numero Telefonico del Conductor',
    },
    active: {
      type: DataTypes.BOOLEAN,
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
  /*   createdAt: 'created_at',
     updatedAt: 'updated_at', */
  });

  return Driver;
};
