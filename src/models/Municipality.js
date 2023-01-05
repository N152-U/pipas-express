/**
 * MunicipalityService
 * @module src/models/Municipality
 * @name Municipality
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
 const { DataTypes } = require('sequelize');

 module.exports = (sequelize) => {
   const Municipality = sequelize.define('municipalities', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
     municipality: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Nombre del Municipio o Alcaldia',
     },
     active: {
       type: DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: true,
       comment: 'Estatus del Municipio o Alcaldia',
     },
    realId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'real_id',
      unique: true,
    },
    geoShape: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'geo_shape',
    },
   }, {
     freezeTableName: true,
     createdAt: false,
     updatedAt: false,
     timestamps: true,
     comment: 'Esta tabla contiene solamente las 16 alcaldías de la ciudad de México, se eliminaron las columnas acronym, created_by y url ya que no eran relevantes para el sistema',
   });
   return Municipality;
 };