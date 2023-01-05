const { FormatService } = require("../services/index.js");
const auth = require("../utils/auth.js");
const APIError = require("../utils/error.js");

module.exports = {
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const invoice = await FormatService.getById(id);
      const newInvoice = {
        folio: invoice.folio,
        folio2: invoice.folio2,
        street: invoice.street,
        garza: invoice.garza,
        date: invoice.date,
        hour: invoice.hour,
        month: invoice.month,
        day: invoice.day,
        year: invoice.year,
        settlement: invoice.collaborator.settlement.settlement,
        municipality: invoice.collaborator.settlement.d_mnpio,
        placa: invoice.driver.drivers.vehicles.placa,
        capacity: invoice.driver.drivers.vehicles.capacity,
        dependency:
          invoice.driver.drivers.vehicles.dependencies.name,
      };

      res.status(200).json({
        payload: invoice,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getExcelDaily: async (req, res, next) => {
    try {
      const invoice = await FormatService.getExcelDaily();
      const newInvoice = invoice.map((value, key) => {
        return {
          folio: value.folio,
          placa: value.driver.drivers.vehicles.placa,
          capacity: value.driver.drivers.vehicles.capacity,
          street: value.street,
          collaborator: value.collaborator.firstName,
          driverFirstName: value.driver.firstName,
          driverPaternalSurname: value.driver.paternalSurname,
          round: value.round,
          folio2: value.folio2,
        };
      });

      res.status(200).json({
        payload: newInvoice,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  excelByDate: async (req, res, next) => {
    try {
      const { body } = req;
      const invoice = await FormatService.getExcelByDate(body);
      /* const newInvoice = invoice.map((value, key) => {
        return {
          folio: value.folio,
          maxRound: value.maxRound,
          placa: value.driver.drivers.vehicles.placa,
          eco: value.driver.drivers.vehicles.eco,
          capacity: value.driver.drivers.vehicles.capacity,
          street: value.street,
          settlement: value.collaborator.settlement.settlement,
          collaborator: value.collaborator.firstName,
          driverFirstName: value.driver.firstName,
          driverPaternalSurname: value.driver.paternalSurname,
          phoneNumberDriver: value.driver.phoneNumber,
          round: value.round,
          folio2: value.folio2,
        };
      }); */

      res.status(200).json({
        payload: invoice,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  /*   totalPiperos:  */
  totalPiperos: async (req, res, next) => {
    try {
      const { body } = req;
      const totalPiperos = await FormatService.totalPiperos(body);
      res
        .status(200)
        .json({
          payload: totalPiperos,
        });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
};
