/**
 * VehicleService
 * @module src/models/Vehicle
 * @name Vehicle
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Vehicle = sequelize.define(
    "vehicles",
    {
      vehicleTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "vehicle_type_id",
        comment: "Llave foranea de la tabla de vehicles",
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Marca del Vehiculo",
      },
      model: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Modelo de vehiculo",
      },
      placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Placa del vehiculo",
      },
      eco: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Numero economico del Vehiculo",
      },
      capacityId: {
        type: DataTypes.INTEGER,
        field: "capacity_id",
        allowNull: false,
        comment: "Capacidad del vehiculo",
      },
      dependencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "dependency_id",
        comment: "Llave foranea de la tabla de dependencies",
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Estatus del vehiculo",
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "created_by",
        comment: "Llave foranea de la tabla users",
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "updated_by",
        comment: "Llave foranea de la tabla users",
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
    },
    {
      freezeTableName: true,
      timestamps: true,
   /*    createdAt: "created_at",
      updatedAt: "updated_at", */
    }
  );

  return Vehicle;
};
