/**
 * DeliveryDetailService
 * @module src/models/index
 * @name models
 * @author Alan Escamilla Mondragón
 * @requires sequelize.Transaction
 * @requires sequelizePostgres
 */

const { Transaction } = require("sequelize");

const sequelizePostgres = require("../utils/postgresClient.js");

const Capacity = require("./Capacity")(sequelizePostgres);
const Collaborator = require("./Collaborator.js")(sequelizePostgres);
const CollaboratorHasSettlement = require("./CollaboratorHasSettlement.js")(
  sequelizePostgres
);
const CollaboratorType = require("./CollaboratorType.js")(sequelizePostgres);
const Dependency = require("./Dependency.js")(sequelizePostgres);
const Driver = require("./Driver.js")(sequelizePostgres);
const DriverHasVehicle = require("./DriverHasVehicle.js")(sequelizePostgres);
const DriverType = require("./DriverType.js")(sequelizePostgres);
const Log = require("./Log.js")(sequelizePostgres);
const Municipality = require("./Municipality.js")(sequelizePostgres);
const Permission = require("./Permission.js")(sequelizePostgres);
const Role = require("./Role.js")(sequelizePostgres);
const RoleHasPermission = require("./RoleHasPermission.js")(sequelizePostgres);
const Settlement = require("./Settlement.js")(sequelizePostgres);
const Status = require("./Status.js")(sequelizePostgres);
const Trip = require("./Trip.js")(sequelizePostgres);
const User = require("./User.js")(sequelizePostgres);
const Vehicle = require("./Vehicle.js")(sequelizePostgres);
const VehicleType = require("./VehicleType.js")(sequelizePostgres);
const WaterIntake = require("./WaterIntake.js")(sequelizePostgres);
const TripHasFolio = require("./TripHasFolio")(sequelizePostgres);
const Photo = require("./Photo")(sequelizePostgres);

try {

  // n:m
  Role.belongsToMany(Permission, {
    through: RoleHasPermission,
    foreignKey: "roleId",
    otherKey: "permissionId",
  });

  Permission.belongsToMany(Role, {
    through: RoleHasPermission,
    foreignKey: "permissionId",
    otherKey: "roleId",
  });
  // 1:n
  Log.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Log, { foreignKey: "userId" });

  //1:1
  Role.hasOne(User, { foreignKey: "roleId" });
  User.belongsTo(Role, { foreignKey: "roleId", as: "roles" });

  // n:m
  Collaborator.belongsToMany(Settlement, {
    through: CollaboratorHasSettlement,
    foreignKey: "collaboratorId",
    otherKey: "settlementId",
  });

  Settlement.belongsToMany(Collaborator, {
    through: CollaboratorHasSettlement,
    foreignKey: "settlementId",
    otherKey: "collaboratorId",
  });
  // 1:1
  CollaboratorType.hasOne(Collaborator, { foreignKey: "collaboratorTypeId" });

  Collaborator.belongsTo(CollaboratorType, {
    foreignKey: "collaboratorTypeId",
    as: "typeCollaborator",
  });

  // 1:1
  DriverType.hasOne(Driver, { foreignKey: "typeDriverId" });

  Driver.belongsTo(DriverType, {
    foreignKey: "typeDriverId",
    as: "typeDriver",
  });
  // 1:1
  VehicleType.hasOne(Vehicle, { foreignKey: "vehicleTypeId" });

  Vehicle.belongsTo(VehicleType, {
    foreignKey: "vehicleTypeId",
    as: "typeVehicle",
  });
  // 1:1
  Dependency.hasOne(Vehicle, { foreignKey: "dependencyId" });

  Vehicle.belongsTo(Dependency, {
    foreignKey: "dependencyId",
    as: "dependencies",
  });

  // 1:n
  Trip.belongsTo(Collaborator, {
    foreignKey: "collaboratorId",
    as: "collaborator",
  });
  Collaborator.hasMany(Trip, {
    foreignKey: "collaboratorId",
    as: "delivery",
  });
  // 1:n
  Vehicle.belongsTo(Capacity, {
    foreignKey: "capacityId",
  });
  Capacity.hasOne(Vehicle, {
    foreignKey: "capacityId",
  });

  // 1:n
  Trip.belongsTo(Driver, {
    foreignKey: "driverId",
    as: "driver",
  });
  Driver.hasMany(Trip, {
    foreignKey: "driverId",
    as: "delivery",
  });
//1:n
  Trip.belongsTo(Vehicle, {
    foreignKey: "vehicleId",
    as: "vehicle",
  });
  Vehicle.hasMany(Trip, {
    foreignKey: "vehicleId",
  //  as: "delivery",
  });
  // 1:n

  Trip.hasMany(TripHasFolio);


  // 1:1

  Municipality.hasOne(Trip, { foreignKey: "municipalityId" ,targetKey: 'realId'  });

  Trip.belongsTo(Municipality, {
    foreignKey: "municipalityId", targetKey: 'realId' 
  });
  // 1:1

  Settlement.hasOne(Trip, { foreignKey: "settlementId" });

  Trip.belongsTo(Settlement, {
    foreignKey: "settlementId",
  });
  // 1:1

  Status.hasOne(Trip, { foreignKey: "statusId" });

  Trip.belongsTo(Status, {
    foreignKey: "statusId",
  });

  // 1:n
  Dependency.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(Dependency, {
    foreignKey: "createdBy",
  });
  // 1:n
  Dependency.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(Dependency, {
    foreignKey: "updatedBy",
  });
  // 1:n
  Capacity.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(Capacity, {
    foreignKey: "createdBy",
  });
  // 1:n
  Capacity.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(Capacity, {
    foreignKey: "updatedBy",
  });

  // 1:n
  VehicleType.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(VehicleType, {
    foreignKey: "createdBy",
  });
  // 1:n
  VehicleType.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(VehicleType, {
    foreignKey: "updatedBy",
  });

  // 1:n
  Vehicle.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(Vehicle, {
    foreignKey: "createdBy",
  });
  // 1:n
  Vehicle.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(Vehicle, {
    foreignKey: "updatedBy",
  });

  // 1:n
  DriverType.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(DriverType, {
    foreignKey: "createdBy",
  });
  // 1:n
  DriverType.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(DriverType, {
    foreignKey: "updatedBy",
  });

  // 1:n
  Driver.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(Driver, {
    foreignKey: "createdBy",
  });
  // 1:n
  Driver.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(Driver, {
    foreignKey: "updatedBy",
  });

  // 1:n
  Trip.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(Trip, {
    foreignKey: "createdBy",
  });
  // 1:n
  Trip.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(Trip, {
    foreignKey: "updatedBy",
  });

  WaterIntake.hasOne(Trip, {
    foreignKey: "waterIntakeId",
  });

  Trip.belongsTo(WaterIntake, {
    foreignKey: "waterIntakeId",
  });

  // 1:n
  Collaborator.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(Collaborator, {
    foreignKey: "createdBy",
  });
  // 1:n
  Collaborator.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(Collaborator, {
    foreignKey: "updatedBy",
  });

  // 1:n
  CollaboratorType.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(CollaboratorType, {
    foreignKey: "createdBy",
  });
  // 1:n
  CollaboratorType.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "updator",
  });
  User.hasMany(CollaboratorType, {
    foreignKey: "updatedBy",
  });

  // 1:1
  Vehicle.hasOne(DriverHasVehicle, { foreignKey: "vehicleId" });

  DriverHasVehicle.belongsTo(Vehicle, {
    foreignKey: "vehicleId",
    as: "vehicles",
  });

  // 1:1
  Driver.hasOne(DriverHasVehicle, { foreignKey: "driverId" });

  DriverHasVehicle.belongsTo(Driver, {
    foreignKey: "driverId",
    as: "drivers",
  });
  // 1:n
  Photo.belongsTo(User, {
    foreignKey: "createdBy",
  });
  User.hasMany(Photo, {
    foreignKey: "createdBy",
  });
  // 1:n
  Photo.belongsTo(User, {
    foreignKey: "updatedBy",
  });
  User.hasMany(Photo, {
    foreignKey: "updatedBy",
  });
  Trip.hasMany(Photo, { foreignKey: "tripId" });


  /**
   * Si se necesita dejar de sincronizar las tablas con el sequelize
   * se dispondra a comentar la función .sync()
   * de la conexión a la base de datos correspondiente;
   *
   * En caso de que se necesite modificar alguna tabla se pondra como
   * parametros de la función {alter:true}
   *
   * En caso de que se requiera eliminar la tabla se pondra como
   * parametros de la funcion {force:true}
   */

  sequelizePostgres
    .sync({ alter: false })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("Connection has been synchronized successfully.");
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.trace(error);
      console.error("Unable to synchronize to the database:", error);
    });
  const tPostgres = async () =>
    sequelizePostgres
      .transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      })
      .then();

  module.exports = {
    tPostgres,
    Collaborator,
    CollaboratorHasSettlement,
    CollaboratorType,
    Dependency,
    Driver,
    DriverHasVehicle,
    DriverType,
    Municipality,
    Permission,
    Role,
    RoleHasPermission,
    Settlement,
    Status,
    Trip,
    User,
    Log,
    Vehicle,
    VehicleType,
    WaterIntake,
    Capacity,
    TripHasFolio,
    Photo,
    sequelizePostgres,
  };
} catch (error) {
  console.log("ERROR:\n", error);
  throw new Error(error);
}
