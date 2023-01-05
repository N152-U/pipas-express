/**
 * TripService
 * @module src/models/Trip
 * @name Trip
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.query("CREATE SEQUENCE IF NOT EXISTS parity_seq AS INT start 1 increment 1")
  const Trip = sequelize.define('trips', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'driver_id',
      comment: 'Llave foranea de la tabla de drivers',
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'vehicle_id',
      comment: 'Llave foranea de la tabla de vehicles',
    },
    collaboratorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'collaborator_id',
      comment: 'Llave foranea de la tabla de collaborators',
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Calle del viaje',
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Viaje o Ronda actual de la Pipa',
    },
    authorize: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Apolonio Toxtlec',
      comment: 'Nombre de quien autoriza',
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'status_id',
      defaultValue: 1,
      comment: 'Llave foranea de la tabla statuses',
    },
    municipalityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'municipality_id',
      comment: 'Alcaldia a la que se dara atencion',
    },
    settlementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'settlement_id',
      comment: 'Colonia a la que se dara atencion',
    },
    waterIntakeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      field: 'water_intake_id',
      comment: 'Llave foranea de la tabla water_intake',
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Viaje Activo o Inactivo',
    },
    assignedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'assigned_by',
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'assigned_at',
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

  return Trip;
};
