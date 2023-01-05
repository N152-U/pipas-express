/**
 * Pipa Controller
 * @module src/controllers/PipaController
 * @name PipaController
 * @author Andrea Naraly Solis Martinez
 * @requires module:PipaService
 */

const { PipaService, CollaboratorService } = require("../services/index.js");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * CONTROLLER
   * Create Role with permissions.
   * @async
   * @function
   * @name create
   * @description Create Role with permissions.
   * @param {Object} req  The request.
   * @param {Object} res  The response.
   * @param {module:Role.Role} req.body The JSON payload.
   * @param {Function} next Next middleware function.
   * @return {Promise<void>}
   */

  create: async (req, res, next) => {
    try {
      const { body } = req;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("body",body)
      const pipero = await PipaService.create(decoded.id,body);
      res.status(201).json({ message: "Pipero created", payload: pipero });
    } catch (error) {

      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const pipa = await PipaService.getAll();
      let newPipa = pipa.map((value, key) => {
        return {
          id: value.id,
          firstName: value.firstName,
          phoneNumber: value.phoneNumber,
          eco: value.drivers_has_vehicle.vehicles.eco,
          placa: value.drivers_has_vehicle.vehicles.placa,
          capacity: value.drivers_has_vehicle.vehicles.capacity.capacity,
          dependency: value.drivers_has_vehicle.vehicles.dependencies.name,
        };
      });
      res.status(200).json({ payload: newPipa });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getAllSettlments: async (req, res, next) => {
    try {
      const settlement = await PipaService.getAllSettlments();

      res.status(200).json({ payload: settlement });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const pipa = await PipaService.getById(id);
      const vehicleDriverParsed = {
        firstName: pipa.dataValues.firstName,
        paternalSurname: pipa.dataValues.paternalSurname,
        maternalSurname: pipa.dataValues.maternalSurname,
        phoneNumber: pipa.dataValues.phoneNumber,
        driversId: pipa.dataValues.drivers_has_vehicle.driverId,
        eco: pipa.dataValues.drivers_has_vehicle.vehicles.eco,
        placa: pipa.dataValues.drivers_has_vehicle.vehicles.placa,
        capacityId: pipa.dataValues.drivers_has_vehicle.vehicles.capacity,
        model: pipa.dataValues.drivers_has_vehicle.vehicles.model,
        brand: pipa.dataValues.drivers_has_vehicle.vehicles.brand,
        dependencyId: pipa.dataValues.drivers_has_vehicle.vehicles.dependencies,
    
      };

      res.status(200).json({ payload: vehicleDriverParsed });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      console.log(req)
      const { body } = req;
      const { id } = req.params;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await PipaService.update(body, id,decoded.id);
      res.status(200).json({ message: 'Pipa has been updated'});
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      await PipaService.delete(id);
      res.status(200).json({ message: 'Pipa has been deleted' });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
};
