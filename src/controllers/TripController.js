const { TripService, UserService } = require("../services/index.js");
const auth = require("../utils/auth.js");
const jwt = require("jsonwebtoken");
const APIError = require("../utils/error.js");
const { decodeToken } = require("../utils/auth.js");
const Moment = require("moment"),
  MomentRange = require("moment-range"),
  moment = MomentRange.extendMoment(Moment);

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
      const pipero = await TripService.create(decoded.id, body);
      res.status(201).json({
        message: " Trip created",
        payload: pipero,
      });
    } catch (error) {
      process.env.DEBUG == true ? next(console.trace(error)) : next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const {
        offset,
        limit,
        status,
        collaborator,
        settlement,
        street,
        created_at,
      } = req.query;

      const trips = await TripService.getAll(
        offset,
        limit,
        status,
        collaborator,
        settlement,
        street,
        created_at
      );

      formattedTrips = trips.map((trip) => {
        trip.dataValues.created_at = moment(trip.dataValues.created_at).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        /*  await console.log("viaje",trip); */
        return trip;
      });

      res.status(200).json({
        payload: formattedTrips,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getAllDaily: async (req, res, next) => {
    try {
      /*    let nowDate = new Date();
      let newDate =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate()+" 00:00:00.000 +00:00"; */
      let newDate = moment().format("YYYY-MM-DD 00:00:00").valueOf();
      const { offset, limit, status, collaborator, settlement, street } =
        req.query;
      console.log("fecha_daily", newDate);
      const trips = await TripService.getAllDaily(
        newDate,
        offset,
        limit,
        status,
        collaborator,
        settlement,
        street
      );
      formattedTrips = trips.map((trip) => {
        trip.dataValues.created_at = moment(trip.dataValues.created_at)
          .local("America/Mexico_City")
          .format("YYYY-MM-DD HH:mm:ss");

        return trips;
      });
      res.status(200).json({
        payload: trips,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getByIdCollaborator: async (req, res, next) => {
    try {
      const { id } = req.params;
      const collaborator = await TripService.getByIdCollaborator(id);
      const formatedCollaborator = {
        street: collaborator.street,
        firstName: collaborator.collaborator.firstName,
        phoneNumber: collaborator.collaborator.phoneNumber,
        settlement: collaborator.settlement.settlement,
      };
      res.status(200).json({
        payload: formatedCollaborator,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getCollaboratorDriver: async (req, res, next) => {
    try {
      const { id } = req.params;
      const collaboratorDriver = await TripService.getCollaboratorDriver(id);
      const formatedCollaboratorDriver = {
        street: collaboratorDriver.street,
        firstNameCollaborator: collaboratorDriver.collaborator.firstName,
        phoneNumberCollaborator: collaboratorDriver.collaborator.phoneNumber,
        settlementCollaborator: collaboratorDriver.settlement.settlement,
        firstNameDriver: collaboratorDriver.driver.firstName,
        eco: collaboratorDriver.driver.drivers_has_vehicle.vehicles.eco,
        placa: collaboratorDriver.driver.drivers_has_vehicle.vehicles.placa,
        capacity:
          collaboratorDriver.driver.drivers_has_vehicle.vehicles.capacity.name,
      };
      res.status(200).json({
        payload: formatedCollaboratorDriver,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },

  getAllEco: async (req, res, next) => {
    try {
      const driversVehicles = await TripService.getAllEco();
      let formattedDriversVehiclesEco = driversVehicles.map((value, key) => {
        return {
          id: value.id,
          vehicleId: value.drivers_has_vehicle.vehicles.id,
          firstNamePipero: value.firstName,
          phoneNumberPipero: value.phoneNumber,
          eco: value.drivers_has_vehicle.vehicles.eco,
          placa: value.drivers_has_vehicle.vehicles.placa,
          capacity: value.drivers_has_vehicle.vehicles.capacity.name,
        };
      });
      res.status(200).json({
        payload: formattedDriversVehiclesEco,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const trip = await TripService.getById(id);

      trip.collaborator.dataValues["settlementsId"] =
        trip.collaborator.settlements.map((settlement) => {
          delete settlement.dataValues.collaborators_has_settlements;
          return settlement;
        });
      delete trip.collaborator.dataValues["settlements"];

      const newTrip = {
        id: trip.id,
        street: trip.street,
        settlementId: trip.settlement,
        collaboratorId: trip.collaborator,
      };
      res.status(200).json({
        payload: newTrip,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  detailGetByIdTrip: async (req, res, next) => {
    try {
      const { id } = req.params;
      const detailTrip = await TripService.detailGetByIdTrip(id);

      /*  const photos = await TripService.getPhotosById(id);
      if(photos[0].data != null)
      {
        photos.map(function(num,i) {
          photos[i].data = photos[i].data.toString('utf8');
      });
      }  */
      res.status(200).json({
        payload: detailTrip,
      });
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
      const message = await TripService.update(id, body);
      res.status(200).json({
        message: message,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  updateByStatus: async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const message = await TripService.updateByStatus(body, id);
      res.status(200).json({
        message: message,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("id del viaje a eliminar", id, typeof id);
      const message = await TripService.delete(id);
      res.status(200).json({
        message: message,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  assign: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const { authorization } = req.headers;
      const assignedTrip = await TripService.assign(
        id,
        body,
        decodeToken(authorization).id
      );

      const round = await TripService.getTotalRounds(id);

      const updateTrip = await TripService.update(id, { round: round.rounds });

      if (body.photo) {
        const photoValve = await TripService.uploadPhotos(
          decodeToken(authorization).id,
          id,
          body
        );
        await UserService.registerUserLogByUserID(
          decodeToken(authorization).id,
          photoValve.id,
          1,
          "photos",
          photoValve
        );
      }
      await UserService.registerUserLogByUserID(
        decodeToken(authorization).id,
        id,
        1,
        "trip",
        assignedTrip
      );
      res.status(200).json({
        message: `El viaje ha sido asignado`,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      //if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getTotalRounds: async (req, res, next) => {
    const { id } = req.params;
    const rounds = await TripService.getTotalRounds(id);
    res.status(200).json({
      payload: rounds,
    });
  },
  unassign: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      await TripService.unassign(id, body);

      res.status(200).json({
        message: `El viaje ha sido desasignado`,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  concluded: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const concludedTrip = await TripService.concluded(id, body);
      res.status(200).json({
        message: `El viaje ha sido concluido`,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getTotalCountDaily: async (req, res, next) => {
    try {
      /*   let nowDate = new Date();
      let newDate =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate()+" 00:00:00.000 +00:00"; */
      let newDate = moment().format("YYYY-MM-DD 00:00:00").valueOf();
      const { offset, limit, status, collaborator, settlement, street } =
        req.query;
      const valvesCount = await TripService.getTotalCountDaily(
        newDate,
        offset,
        limit,
        status,
        collaborator,
        settlement,
        street
      );
      res.json({ payload: valvesCount });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getTotalCount: async (req, res, next) => {
    try {
      const {
        offset,
        limit,
        status,
        collaborator,
        settlement,
        street,
        created_at,
      } = req.query;
      const valvesCount = await TripService.getTotalCount(
        offset,
        limit,
        status,
        collaborator,
        settlement,
        street,
        created_at
      );
      res.json({ payload: valvesCount });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getRecordsBetweenDates: async (req, res, next) => {
    try {
      const { startDate, endDate } = req.params;
      var fromDate = moment(startDate).format("YYYY-MM-DD 00:00:00").valueOf();
      var toDate = moment(endDate).format("YYYY-MM-DD 23:59:59").valueOf();

      var range = moment().range(fromDate, toDate);
      /*       var diff = range.diff('days');
      console.log("range", range); */
      var array = Array.from(range.by("day", { step: 1 }));
      array = array.map((m) => m.format("YYYY-MM-DD"));

      const trips = await TripService.getRecordsBetweenDates(fromDate, toDate);
      /* const settlements = await TripService.getSettlementsAttendance(fromDate,toDate);
       */
      // this gives an object with dates as keys
      let groups_dates = {};
      groups_dates = trips.reduce((groups, trip) => {
        const date = trip.dataValues.date;
        if (!groups[date]) {
          groups[date] = { trips: [], settlements: [] };
        }

        //Campos aplanados
        trip.dataValues["collaborator"] =
          trip["collaborator"].dataValues.firstName;
        trip.dataValues["settlement"] =
          trip["settlement"].dataValues.settlement;
        trip.dataValues["driverFirstName"] = trip.dataValues.driver?.firstName;
        trip.dataValues["driverPhoneNumber"] =
          trip.dataValues.driver?.phoneNumber;
        trip.dataValues["eco"] =
          trip.dataValues.driver?.drivers_has_vehicle?.vehicles?.eco;
        trip.dataValues["placa"] =
          trip.dataValues.driver?.drivers_has_vehicle?.vehicles?.placa;
        trip.dataValues["capacity"] =
          trip.dataValues.driver?.drivers_has_vehicle?.vehicles?.capacity?.capacity;

        delete trip.dataValues.driver;
        //Datos para calculo por colonia
        groups[date]["settlements"].push({
          settlement: trip.dataValues.settlement,
          folios: trip.dataValues.folios,
        });
        groups[date]["trips"].push(trip);

        return groups;
      }, {});

      console.log("my_settlements", groups_dates["trips"]);
      //Ya tenemos la agrupacion, le damos otro tratamiento para adecuar los datos
      groups_dates = Object.keys(groups_dates).map((key, index) => {
        //Donde quedaran settlements y trips
        let aux = {};
        aux[key] = {
          settlements: null,
          trips: null,
          grandTotals: { 10000: 0, 20000: 0, totalFolios: 0, totalLiters: 0 },
        };
        aux[key]["trips"] = groups_dates[key]["trips"];
        //Hacemos las cuentas de folios por tipo de folio y por colonia
        aux[key]["settlements"] = groups_dates[key]["settlements"].reduce(
          (groups, trip) => {
            console.log("settlement_trip", trip);
            const settlement = trip.settlement;
            if (!groups[settlement]) {
              groups[settlement] = [];
            }

            trip["10000"] = trip.folios.flat().filter((value) => {
              return value?.folioType == "1";
            }).length;
            trip["20000"] = trip.folios.flat().filter((value) => {
              return value?.folioType == "2";
            }).length;
            delete trip.folios;
            groups[settlement].push(trip);

            return groups;
          },
          {}
        );
        //Obtenemos el total de tipo de folios y obtenemos el total de litros  por colonia
        aux[key]["settlements"] = Object.keys(aux[key]["settlements"]).map(
          (settlement) => {
            let count10000 = 0;
            let count20000 = 0;
            count10000 = aux[key]["settlements"][settlement].reduce(
              (total, obj) => obj["10000"] + total,
              0
            );
            count20000 = aux[key]["settlements"][settlement].reduce(
              (total, obj) => obj["20000"] + total,
              0
            );

            let auxSettlements = {};
            auxSettlements[settlement] = {
              name: settlement,
              10000: count10000,
              20000: count20000,
              folios: count10000 + count20000,
              liters: count10000 * 10000 + count20000 * 20000,
            };
            return auxSettlements;
          }
        );
        //Obtenemos los grandes totales
        aux[key]["grandTotals"]["10000"] = Object.keys(
          aux[key]["settlements"]
        ).reduce((accum, settlement) => {
          return (
            accum +
            Object.values(aux[key]["settlements"][settlement]).reduce(
              (accum, value) => accum + value["10000"],
              0
            )
          );
        }, 0);
        aux[key]["grandTotals"]["20000"] = Object.keys(
          aux[key]["settlements"]
        ).reduce((accum, settlement) => {
          return (
            accum +
            Object.values(aux[key]["settlements"][settlement]).reduce(
              (accum, value) => accum + value["20000"],
              0
            )
          );
        }, 0);
        aux[key]["grandTotals"]["totalFolios"] = Object.keys(
          aux[key]["settlements"]
        ).reduce((accum, settlement) => {
          return (
            accum +
            Object.values(aux[key]["settlements"][settlement]).reduce(
              (accum, value) => accum + value["folios"],
              0
            )
          );
        }, 0);
        aux[key]["grandTotals"]["totalLiters"] = Object.keys(
          aux[key]["settlements"]
        ).reduce((accum, settlement) => {
          return (
            accum +
            Object.values(aux[key]["settlements"][settlement]).reduce(
              (accum, value) => accum + value["liters"],
              0
            )
          );
        }, 0);

        return aux;
      });

      res.status(200).json({
        payload: groups_dates,
      });
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      if (process.env.DEBUG) console.log(error);
      next(error);
    }
  },
  getCountVehicle: async (req, res, next) => {
    try {
      let newDate = moment().format("YYYY-MM-DD").valueOf();
      const vehicleCount = await TripService.getCountVehicle(newDate);
      res.json({ payload: vehicleCount });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getCountTrips: async (req, res, next) => {
    try {
      const tripsCount = await TripService.getCountTrips();
      res.json({ payload: tripsCount });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getCountTripsDaily: async (req, res, next) => {
    try {
      let newDate = moment().format("YYYY-MM-DD").valueOf();
      const tripsCountDaily = await TripService.getCountTripsDaily(newDate);
      res.json({ payload: tripsCountDaily });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getCountTripsHistorical: async (req, res, next) => {
    try {
      const tripsCountHistorical = await TripService.getCountTripsHistorical();
      res.json({ payload: tripsCountHistorical });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getCountLitersDaily: async (req, res, next) => {
    try {
      let newDate = moment().format("YYYY-MM-DD").valueOf();
      const litersCountDaily = await TripService.getCountLitersDaily(newDate);
    
 
      let total;
      let folioType10000 = 0;
      let folioType20000 = 0;


      litersCountDaily.map((value)=>{

        value["dataValues"].folios.filter((value) => {
            console.log("value trip",value[0].folioType)

            value.map((value)=>{
                 if(value.folioType == '1'){
                  folioType10000 += 1;
                }
                if(value.folioType == '2'){
                  folioType20000 += 1;
                } 
            });
          });
          /* console.log("folioType10000",folioType10000)
          console.log("folioType20000",folioType20000) */
      });

       total = folioType10000*10000+folioType20000*20000;

 
      res.json({ payload: total });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getCountLitersMonthly: async (req, res, next) => {
    try {
      let newDate = moment().format("YYYY-MM").valueOf();
      const litersCountMonthly = await TripService.getCountLitersMonthly(newDate);
      console.log("litersCountMonthly",litersCountMonthly)
      
      let total;
      let folioType10000 = 0;
      let folioType20000 = 0;


      litersCountMonthly.map((value)=>{

        value["dataValues"].folios.filter((value) => {
            console.log("value trip",value[0].folioType)

            value.map((value)=>{
                 if(value.folioType == '1'){
                  folioType10000 += 1;
                }
                if(value.folioType == '2'){
                  folioType20000 += 1;
                } 
            });
          });
          /* console.log("folioType10000",folioType10000)
          console.log("folioType20000",folioType20000) */
      });

       total = folioType10000*10000+folioType20000*20000;

      res.json({ payload: total });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },

};
