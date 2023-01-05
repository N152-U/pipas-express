/**
 * DriverVehicleService
 * @module src/models/DriverHasVehicle
 * @name DriverHasVehicle
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DriverHasVehicle = sequelize.define('drivers_has_vehicles', {
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'driver_id',
      comment: 'Llave foranea de la tabla de drivers',
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'vehicle_id',
      comment: 'Llave foranea de la tabla de vehicles',
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  });
  return DriverHasVehicle;
};
