/**
 * Valve Controller
 * @module src/controllers/ValveController
 * @name ValveController
 * @author Andrea Naraly Solis Martinez
 * @requires module:CatalogService
 */


 const jwt = require("jsonwebtoken");
 const { CatalogService } = require("../services/index.js");
 const auth = require("../utils/auth.js");
 const APIError = require("../utils/error.js");
 
 module.exports = {
 
   getAllCapacity: async (req, res, next) => {
    try {

      const capacities = await CatalogService.getAllCapacity();
      res.json({ payload: capacities });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getAllDependency: async (req, res, next) => {
    try {

      const dependencies = await CatalogService.getAllDependency();
      res.json({ payload: dependencies });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getAllSettlement:async (req, res, next) => {
    try {

      const settlements = await CatalogService.getAllSettlement();
      res.json({ payload: settlements });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getAllStatus:async (req, res, next) => {
    try {

      const statuses = await CatalogService.getAllStatus();
      res.json({ payload: statuses });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
   
 };
 