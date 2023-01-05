/**
 * CollaboratorService
 * @module src/models/Collaborator
 * @name Collaborator
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Collaborator = sequelize.define('collaborators', {
    collaboratorTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: 'collaborator_type_id',
     /*  comment: 'Llave foranea de la tabla de type_collaborators', */
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
      comment: 'Nombre del Colaborador',
    },
    paternalSurname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'paternal_surname',
      comment: 'Apellido Paterno del Colaborador',
    },
    maternalSurname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'maternal_surname',
      comment: 'Apellido Materno del Colaborador',
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'phone_number',
      unique: true,
      comment: 'Numero Telefonico del Colaborador',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    /*   comment: 'Estatus del tipo de colaborador' */
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'created_by',
     /*  comment: 'Llave foranea de la tabla users', */
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

  return Collaborator;
};
