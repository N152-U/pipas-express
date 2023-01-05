/**
 * Delivery Detail Controller
 * @module src/controllers/RoleController
 * @name RoleController
 * @author Andrea Naraly Solis Martinez
 * @requires module:RoleService
 */

const { CollaboratorService } = require("../services/index.js");
const jwt = require("jsonwebtoken");
const Collaborator = require("../models/Collaborator.js");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { body } = req;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const collaborator = await CollaboratorService.create(decoded.id, body);
      res
        .status(201)
        .json({ message: "Collaborator created", payload: collaborator });
    } catch (error) {
      //process.env.DEBUG ? next(console.trace(error)) : next(error);
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const collaborators = await CollaboratorService.getAll();

      let collaboratorsParsed = collaborators.map((collaborator) => {
        collaborator.dataValues["settlementsId"] = collaborator.settlements.map(
          (settlement) => {
            delete settlement.dataValues.collaborators_has_settlements;
            return settlement;
          }
        );
        delete collaborator.dataValues.settlements;
        return collaborator;
      });

      res.status(200).json({ payload: collaboratorsParsed });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const collaborator = await CollaboratorService.getById(id);

      collaborator.settlements = collaborator.settlements.map((value) => {
        delete value.dataValues.collaborators_has_settlements;
        return value;
      });
      const collaboratorParsed = {
        id: collaborator.id,
        firstName: collaborator.firstName,
        paternalSurname: collaborator.paternalSurname,
        maternalSurname: collaborator.maternalSurname,
        phoneNumber: collaborator.phoneNumber,
        settlementsId: collaborator.settlements,
      };
      res.status(200).json({ payload: collaboratorParsed });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      await CollaboratorService.update(body, id);
      res.status(200).json({ message: "Enlace has been updated" });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      await CollaboratorService.delete(id);
      res.status(200).json({ message: "Enlace has been deleted" });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getSettlementsByCollaborator: async (req, res, next) => {
    try {
      const { id } = req.params;
      const settlements =
        await CollaboratorService.getSettlementsByCollaborator(id);
      res.json({ payload: settlements });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
};
