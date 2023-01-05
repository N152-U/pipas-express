/**
 * Role Service
 * @module src/services/RoleService
 * @name RoleService
 * @author Andrea Naraly Solis Martinez
 * @requires module:Role
 * @requires module:RoleHasPermission
 * @requires module:tPostgres
 */

const {
  Driver,
  Vehicle,
  DriverHasVehicle,
  Role,
  Settlement,
  Permission,
  Dependency,
  Capacity,
  User,
  tPostgres,
} = require("../models/index.js");

const { Sequelize } = require("sequelize");

const { gt, lte, ne, in: opIn, notLike } = Sequelize.Op;

let t;
module.exports = {
  create: async (createdBy,body) => {
    try {
      t = await tPostgres();
      const vehicleCreated = await Vehicle.create(
        {
          vehicleTypeId: body.vehicleTypeId,
          brand: body.brand,
          model: body.model,
          placa: body.placa,
          eco: body.eco,
          createdBy: createdBy,
          dependencyId: body.dependencyId,
          capacityId: body.capacityId,

          include: [
            {
              association: DriverHasVehicle,
            },
          ],
        },
        { transaction: t },
      );

      const piperoCreated = await Driver.create(
        {
          firstName: body.firstName,
          paternalSurname: body.paternalSurname,
          maternalSurname: body.maternalSurname,
          phoneNumber: body.phoneNumber,
          createdBy: createdBy,
          include: [
            {
              association: DriverHasVehicle,
            },
          ],
        },
        { transaction: t },
      );

      const vehicleDriver = await DriverHasVehicle.create(
        {
          driverId: piperoCreated.id,
          vehicleId: vehicleCreated.id,
        },
        { transaction: t },
      );

      await t.commit();
      return vehicleDriver;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
        const errorMessage = error.original;
      throw new Error(errorMessage);
    }
  },

  getAll: async () =>
    Driver.findAll({
      attributes: ['id', 'firstName', 'phoneNumber'],
      where: { active: true },
      include: [
        {
          model: DriverHasVehicle,
          as: 'drivers_has_vehicle',
          attributes: ['driverId'],
          where: { active: true },
          required: true,
          include: [
            {
              model: Vehicle,
              as: 'vehicles',
              attributes: ['eco', "placa", "capacityId"],
              where: { active: true },
              required: true,
              include: [
                {
                  model: Dependency,
                  as: "dependencies",
                  attributes: ["name"],
                  where: { active: true },
                  required: true,
                },
                {
                  model: Capacity,
                  attributes: ["capacity"],
                  where: { active: true },
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    }),

    getAllSettlement: async () =>
    Settlement.findAll({
      attributes: ['id', 'settlement', 'd_tipo_asenta'],
      where: {
        municipalityId: 13,
      },
    }),

  getById: async (id) =>
    Driver.findByPk(id, {
      attributes: [
        "firstName",
        "paternalSurname",
        "maternalSurname",
        "phoneNumber",
      ],
      where: { active: true },
      include: [
        {
          model: DriverHasVehicle,
          as: "drivers_has_vehicle",
          attributes: ["driverId"],
          required: true,
          include: [
            {
              model: Vehicle,
              as: "vehicles",
              attributes: ["eco", "placa", "capacityId", "model", "brand"],
              required: true,
              include: [
                {
                  model: Dependency,
                  as: "dependencies",
                  attributes: ["id","name"],
                  required: true,
                },
                {
                  model: Capacity,
                  attributes: ["id","name"],
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    }),
  update: async (body, id,userId) => {
    try {
      t = await tPostgres();

      await Driver.update(
        {
          firstName: body.firstName,
          paternalSurname: body.paternalSurname,
          maternalSurname: body.maternalSurname,
          phoneNumber: body.phoneNumber,
      
          updatedBy: userId,
          typeDriverId: body.typeDriverId,

          include: [
            {
              association: DriverHasVehicle,
            },
          ],
        },
        { where: { id } },
        { transaction: t },
      );
      const vehicleId = await DriverHasVehicle.findOne({
        attributes: ["vehicleId"],
        where: { driver_id: id },
      });

      await Vehicle.update(
        {
          vehicleTypeId: 1,
          brand: body.brand,
          model: body.model,
          placa: body.placa,
          eco: body.eco,
          capacityId: body.capacityId,
          updatedBy: userId,
          dependencyId: body.dependencyId,

          include: [
            {
              association: DriverHasVehicle,
            },
          ],
        },
         { where: { id: vehicleId.dataValues.vehicleId } },
        { transaction: t },
      );

      await t.commit();
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },

  delete: async (id) => {
    try {
      t = await tPostgres();

      await Driver.update(
        { active: false },
        { where: { id } },
        { transaction: t }
      );

      await Vehicle.update(
        { active: false },
        { where: { id } },
        { transaction: t }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
};
