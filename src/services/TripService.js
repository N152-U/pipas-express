const {
  Sequelize,
  QueryTypes
} = require('sequelize');
const moment = require("moment")

const { Op } = require('sequelize');

const {
  Trip,
  Collaborator,
  Settlement,
  Driver,
  DriverHasVehicle,
  Vehicle,
  WaterIntake,
  Status,
  Capacity,
  User,
  TripHasFolio,
  Photo,
  Municipality,
  tPostgres,

} = require('../models/index.js');

const sequelizePostgres = require("../utils/postgresClient.js");


let t;
module.exports = {

  create: async (createdBy, body) => {
    try {
      const {  collaboratorId, settlementsId, street} = body;
      t = await tPostgres();
     
      body.createdBy = createdBy;
      /* body["created_at"] =  new Date(new Date() - 3600 * 1000 * 6).toISOString(); */
      const TripCreated = await Trip.create({
        ...body, 
      }, {
        transaction: t,
      });
      await t.commit();
      return TripCreated;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) => `${acc} ${
        ValidationErrorItem.type
      }: ${
        ValidationErrorItem.message
      }\n`;
      const errorMessage = error.errors.reduce(reducer, 'Errors: \n');
      throw new Error(errorMessage);
    }
  },

  getAll: async (offset,limit,status,collaborator,settlement,street,created_at) => {
    whereStatus = { active: true };
    if (status) {
      whereStatus.name = {
        [Op.iLike]: `%${status}%`,
      };
    }
    whereCollaborator = { active: true };
    if (collaborator) {
      whereCollaborator.firstName = {
        [Op.iLike]: `%${collaborator}%`,
      };
    }
    whereSettlement = { active: true };
    if (settlement) {
      whereSettlement.settlement = {
        [Op.iLike]: `%${settlement}%`,
      };
    }
    whereStreet = { active: true};
    if (street) {
      whereStreet.street = {
        [Op.iLike]: `%${street}%`,
      };
    }
    if (created_at) {
      whereStreet.created_at =  Sequelize.where(Sequelize.cast(Sequelize.col('trips.created_at'),'varchar'),{
        [Op.like]: `${created_at}%`
      });
      };
 


   /*  require("../utils/helpers").listMethodsSequelizeModel(Trip); */

    return Trip.findAll({
     /*  subQuery: false, */
    attributes: [
      'id', 'street','created_at', 'statusId', 'driverId','round'
    ],
    where: whereStreet,
    include: [
      
      {
      model: Collaborator,
      as: 'collaborator',
      attributes: ['firstName'],
      where: whereCollaborator,
      required: true,
    
    },
  { model: Status,
     
      attributes: ['id','name'],
      where: whereStatus,
      required: true,},
      {
      model: Settlement,
      as: 'settlement',
      attributes: ['settlement'],
      where: whereSettlement,
      required: true,
    },{
      model: Driver,
      as: "driver",
      attributes: ["firstName","phoneNumber"],
      where: {
        active: true
      },
      required: false,
      include: [
        {
          model: DriverHasVehicle,
          as: "drivers_has_vehicle",
          attributes: ["driverId"],
          required: false,
          include: [
            {
              model: Vehicle,
              as: "vehicles",
              attributes: ["eco", "placa", "capacityId"],
              required: true,
              include: [
                {
                  model: Capacity,
                  attributes: ["name"], 
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
    ],
    offset,
    limit
   
  }).then((data) => {
    //Obtenemos folios
    return Promise.all(data.map(async trip => {
      try{
       
        trip.dataValues.folios=await (await require('.').TripService.getTripFoliosParity(trip.id)).map((element)=>element.folios);
        console.log(trip.dataValues.folios)
        return await trip;
     } catch(e) {
       return e.toString();
     }
   })).then((data)=>
   {
   return data;
   });
  
  })},
  getTripFoliosParity:async (id)=>
  {
    return  sequelizePostgres.query("select jsonb_agg(json_build_object('folio',r1.folio, 'folioType', r1.folio_type, 'parity', r1.parity)) folios from (select  folio,folio_type, parity  from trips_has_folios where trip_id=:id order by folio) r1 group by r1.parity ;", {
      raw: true,
      replacements:{id:id},
      type: QueryTypes.SELECT,
    });
  },
  
/*   getTotalCountDaily: (newDate,offset,limit,name,collaborator,settlement,street) => {
    whereStatus = { active: true };
    if (name) {
      whereStatus.name = {
        [Op.iLike]: `%${name}%`,
      };
    }
    whereCollaborator = { active: true };
    if (collaborator) {
      whereCollaborator.firstName = {
        [Op.iLike]: `%${collaborator}%`,
      };
    }
    whereSettlement = { active: true };
    if (settlement) {
      whereSettlement.settlement = {
        [Op.iLike]: `%${settlement}%`,
      };
    }
    whereStreet = { active: true,
      created_at: {
        [Op.gte]: `${newDate}`,
      }, };
    if (street) {
      whereStreet.street = {
        [Op.iLike]: `%${street}%`,
      };
    }
    return Trip.count({
      where: whereStreet,
      include: [{
        model: Collaborator,
        as: 'collaborator',
        attributes: ['firstName'],
        where: whereCollaborator,
        required: true,
      
      },{ model: Status,
        where: whereStatus,
        required: true,},{
        model: Settlement,
        as: 'settlement',
   
        where: whereSettlement,
        required: true,
      },{
        model: Driver,
        as: "driver",
        where: {
          active: true
        },
        required: false,
        include: [
          {
            model: DriverHasVehicle,
            as: "drivers_has_vehicle",
            required: true,
            include: [
              {
                model: Vehicle,
                as: "vehicles",
                required: true,
              },
            ],
          },
        ],
      }],
      offset: offset,
      limit: limit,
    }).then((data) => {
      return data;
    });

}, */
  getAllDaily: async (newDate,offset,limit,status,collaborator,settlement,street) => {
    
    whereStatus = { active: true };
    if (status) {
      whereStatus.name = {
        [Op.iLike]: `%${status}%`,
      };
    }
    whereCollaborator = { active: true };
    if (collaborator) {
      whereCollaborator.firstName = {
        [Op.iLike]: `%${collaborator}%`,
      };
    }
    whereSettlement = { active: true };
    if (settlement) {
      whereSettlement.settlement = {
        [Op.iLike]: `%${settlement}%`,
      };
    }
    whereStreet = { active: true,
      created_at: {
        [Op.gte]:newDate,
      }, };
    if (street) {
      whereStreet.street = {
        [Op.iLike]: `%${street}%`,
      };
    }

    return Trip.findAll({
    attributes: [
      'id', 'street','created_at', 'statusId','round'
    ],
    where: whereStreet,
    include: [{
      model: Collaborator,
      as: 'collaborator',
      attributes: ['firstName'],
      where: whereCollaborator,
      required: true,
    
    },{ model: Status,
     
      attributes: ['id','name'],
      where: whereStatus,
      required: true,},
      {
      model: Settlement,
      as: 'settlement',
      attributes: ['settlement'],
      where: whereSettlement,
      required: true,
    },{
      model: Driver,
      as: "driver",
      attributes: ["firstName","phoneNumber"],
      where: {
        active: true
      },
      required: false,
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
              attributes: ["eco", "placa", "capacityId"],
              required: true,
              include: [
                {
                  model: Capacity,
                  attributes: ["name"], 
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    }],
    offset: offset,
    limit: limit,
  }).then((data) => {
    //Obtenemos folios
    return Promise.all(data.map(async trip => {
      try{
       
        trip.dataValues.folios=await (await require('.').TripService.getTripFoliosParity(trip.id)).map((element)=>element.folios);
      
        return await trip;
     } catch(e) {
       return e.toString();
     }
   })).then((data)=>
   {
   return data;
   });
});
},
getSettlementsAttendance: async (startDate, endDate) => Trip.findAll({
  attributes: [
    'id', 'street','round', [
      Sequelize.fn(
        "to_date",
        Sequelize.cast(
          Sequelize.col("trips.created_at"),
          "varchar"
        ),
        "YYYY MM DD"
      ),
      "date",
    ],
    "created_at",
  ],
  where: { active: true,
    created_at: {
      [Op.between]: [startDate, endDate],
    }, },
  include: [
  {
    model: Settlement,
    as: 'settlement',
    attributes: ['settlement'],
    where: {active: true},
    required: true,
  },{
    model: Vehicle,
    as:'vehicle',
    attributes: ["capacity_id"],
    where: {
      active: true
    },
    required: false,
    include: [
      {
        model: Capacity,     
        attributes: ["capacity"],
        required: true
      },
    ],
  }],
},).then((data)=>
 {
 return data;
 }),
getRecordsBetweenDates: async (startDate, endDate) => Trip.findAll({
    attributes: [
      'id', 'street','round', [
        Sequelize.fn(
          "to_date",
          Sequelize.cast(
            Sequelize.col("trips.created_at"),
            "varchar"
          ),
          "YYYY MM DD"
        ),
        "date",
      ],
      "created_at",
    ],
    where: { active: true,
      created_at: {
        [Op.between]: [startDate, endDate],
      }, },
    include: [{
      model: Collaborator,
      as: 'collaborator',
      attributes: ['firstName'],
      where: {active: true},
      required: true,
    
    },
    {
      model: Settlement,
      as: 'settlement',
      attributes: ['settlement'],
      where: {active: true},
      required: true,
    },{
      model: Driver,
      as: "driver",
      attributes: ["firstName","phoneNumber"],
      where: {
        active: true
      },
      required: false,
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
              attributes: ["eco", "placa"],
              required: true,
              include: [
                {
                  model: Capacity,
                  attributes: ["capacity",], 
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    }],
  }).then((data) => {
     //Obtenemos folios
     return Promise.all(data.map(async trip => {
      try{
        trip.dataValues.folios=await (await require('.').TripService.getTripFoliosParity(trip.id)).map((element)=>element.folios);
        return await trip;
     } catch(e) {
       return e.toString();
     }
   })).then((data)=>
   {
   return data;
   });
  }),
  getCountVehicle: async (newDate) => Trip.findAll({
    where: {
      active: true,
      [Op.not]: {
        driverId: null
      },  
      created_at: {
        [Op.gte]: newDate,
      }
    },
    group: ['driver_id'],
  attributes: [[Sequelize.literal('COUNT(DISTINCT(driver_id))'),'count']]
   
  }).then((data)=>{
console.log("data_count",data)

suma= data.map((value)=>
{
  console.log("cuenta",value.dataValues.count)
return value.dataValues.count;
}).reduce((accum,val)=>
{
  return accum+parseInt(val);
},0);

return suma
  }),
 
  getCountTrips: async () => Trip.findAll({
    where: {
      active: true,
      [Op.not]: {
        round: null
      }, 
    },
    group: ['round'],
    attributes: [[Sequelize.fn('SUM', Sequelize.col('round')), 'round']],

   
  }).then((data)=>{
    
    
    suma= data.map((value)=>
    {
    return value.dataValues.round;
    }).reduce((accum,val)=>
    {
      return parseInt(accum)+parseInt(val);
    },0);
    
    return suma
      }),

  getTotalCountDaily: (newDate,offset,limit,name,collaborator,settlement,street) => {
    whereStatus = { active: true };
    if (name) {
      whereStatus.name = {
        [Op.iLike]: `%${name}%`,
      };
    }
    whereCollaborator = { active: true };
    if (collaborator) {
      whereCollaborator.firstName = {
        [Op.iLike]: `%${collaborator}%`,
      };
    }
    whereSettlement = { active: true };
    if (settlement) {
      whereSettlement.settlement = {
        [Op.iLike]: `%${settlement}%`,
      };
    }
    whereStreet = { active: true,
      created_at: {
        [Op.gte]: `%${newDate}`,
      }, };
    if (street) {
      whereStreet.street = {
        [Op.iLike]: `%${street}%`,
      };
    }
    return Trip.count({
      where: whereStreet,
      include: [{
        model: Collaborator,
        as: 'collaborator',
        attributes: ['firstName'],
        where: whereCollaborator,
        required: true,
      
      },{ model: Status,
        where: whereStatus,
        required: true,},{
        model: Settlement,
        as: 'settlement',
   
        where: whereSettlement,
        required: true,
      },{
        model: Driver,
        as: "driver",
        where: {
          active: true
        },
        required: false,
        include: [
          {
            model: DriverHasVehicle,
            as: "drivers_has_vehicle",
            required: true,
            include: [
              {
                model: Vehicle,
                as: "vehicles",
                required: true,
              },
            ],
          },
        ],
      }],
      offset: offset,
      limit: limit,
    }).then((data) => {
      return data;
    });
  },
  getTotalCount: (offset,limit,status,collaborator,settlement,street,created_at) => {
    whereStatus = { active: true };
    if (status) {
      whereStatus.name = {
        [Op.iLike]: `%${status}%`,
      };
    }
    whereCollaborator = { active: true };
    if (collaborator) {
      whereCollaborator.firstName = {
        [Op.iLike]: `%${collaborator}%`,
      };
    }
    whereSettlement = { active: true };
    if (settlement) {
      whereSettlement.settlement = {
        [Op.iLike]: `%${settlement}%`,
      };
    }
    whereStreet = { active: true,};
    if (street) {
      whereStreet.street = {
        [Op.iLike]: `%${street}%`,
      };
    }
    if (created_at) {
      whereStreet.created_at =  Sequelize.where(Sequelize.cast(Sequelize.col('trips.created_at'),'varchar'),{
        [Op.like]: `${created_at}%`
      });
      };
    
    return Trip.count({
      where:whereStreet,
      include: [{
        model: Collaborator,
        as: 'collaborator',
        where: whereCollaborator,
        required: true,
      },{ model: Status,
        where: whereStatus,
        required: true,},{
        model: Settlement,
        as: 'settlement',
        where: whereSettlement,
        required: true,
      },{
        model: Driver,
        as: "driver",
        where: {
          active: true
        },
        required: false,
        include: [
          {
            model: DriverHasVehicle,
            as: "drivers_has_vehicle",
            required: false,
            include: [
              {
                model: Vehicle,
                as: "vehicles",
                required: false,
              },
            ],
          },
        ],
      },],
      offset: offset,
      limit: limit,
    }).then((data) => {
      return data;
    });
  },

  getByIdCollaborator: async (id) => Trip.findByPk(id,{
    attributes: [
      'street','round'
    ],
    where: {
      active: true,
    },
    include: [{
      model: Collaborator,
      as: 'collaborator',
      attributes: ['firstName','phoneNumber'],
      where: {
        active: true,
      },
      required: false,
    
    },{
      model: Settlement,
      as: 'settlement',
      attributes: ['settlement'],
      where: {
        active: true,
      },
      required: false,
    }],
  
  }),
  getCollaboratorDriver: async (id) => Trip.findByPk(id,{
    attributes: [
      'street'
    ],
    where: {
      active: true,
    },
    include: [{
      model: Collaborator,
      as: 'collaborator',
      attributes: ['firstName','phoneNumber'],
      where: {
        active: true,
      },
      required: true,
    
    },{
      model: Settlement,
      as: 'settlement',
      attributes: ['settlement'],
      where: {
        active: true,
      },
      required: true,
    },{
      model: Driver,
      as: 'driver',
      attributes: ['firstName'],
      required: true,
      include: [{
        model: DriverHasVehicle,
        as: "drivers_has_vehicle",
        attributes: ["driverId"],
        required: true,
        include: [{
            model: Vehicle,
            as: "vehicles",
            attributes: ["eco", "placa", "capacityId"],
            required: true,
            include: [
              {
                model: Capacity,
                attributes: ["name"],
                required: true,
              },
            ],
        }, ],
    }, ],
    }],
  
  }),
  getAllEco: async() => Driver.findAll({
    attributes: ['id', "firstName", "phoneNumber"],
    where: { active: true },
    include: [{
        model: DriverHasVehicle,
        as: "drivers_has_vehicle",
        attributes: ["driverId"],
        required: true,
        include: [{
            model: Vehicle,
            as: "vehicles",
            attributes: ["id","eco", "placa", "capacityId"],
            required: true,
            include: [
              {
                model: Capacity,
                attributes: ["name"],
                required: true,
              },
            ],
        }, ],
    }, ],
}),

  getById: async (id) => Trip.findByPk(id, {
    attributes: [
      "id","street","settlement_id"
    ],
    where: {
      active: true,
    },
    include: [{
      model: Collaborator,
      as: "collaborator",
      attributes: [
        "id","firstName", "paternalSurname", "maternalSurname", "phoneNumber",
      ],
      include: [{
      model: Settlement,
      as: "settlements",
      attributes: ["id", "settlement" ,"d_tipo_asenta","municipalityId"],
      where: {
        active: true
      },
      required: true,
    }],
  },
  {
    model: Settlement,
    as: "settlement",
    attributes: ["id", "settlement" ,"d_tipo_asenta","municipalityId"],
    where: {
      active: true
    },
    required: true,
  }
    ]}),
  detailGetByIdTrip: async (id) => Trip.findByPk(id, {
    attributes: [
      "street","id"
    ], 
    where: {
      active: true,
    },
    include: [{
      model: Collaborator,
      as: "collaborator",
     attributes: [
        "firstName", "paternalSurname", "maternalSurname", "phoneNumber",
      ],
  }, {
    model: Driver,
    as: "driver",
    attributes: ["firstName",'paternalSurname','maternalSurname',"phoneNumber"],
    where: {
      active: true
    },
    required: false,
    
    include: [
      {
        model: DriverHasVehicle,
        as: "drivers_has_vehicle",
        required: false,
        include: [
          {
            model: Vehicle,
            as: "vehicles",
            attributes: ["eco", "placa"],
            required: false,
            include: [
              {
                model: Capacity,
                attributes: ["name"], 
                required: false,
              },
            ],
          },
        ],
      },
    ],
  },{
    model: Status,
    attributes: ['name'],
    required: true,
  },{
    model: Municipality,
    attributes: ['municipality'],
    required: false,
  },
  {
    model: Settlement,
    as: "settlement",
    attributes: ["settlement"],
  }],

  }).then(async(trip) => {
    trip.dataValues.folios=await (await require('.').TripService.getTripFoliosParity(trip.id)).map((element)=>element.folios);
    trip.dataValues.photos=await trip.getPhotos();
    return   await trip;
    
  }),
  
  getFoliosById: async (id) => TripHasFolio.findAll({
    attributes: ['folio','folio2'],
    where: {
      tripId: id,
    },
  }), 
  getPhotosById: async (id) => Photo.findAll({
    attributes: ['data'],
    where: {
      tripId: id,
    },
  }), 

  update: async (id, body) => {
    try {
     
      t = await tPostgres();
     /*  body["updated_at"] =  new Date(new Date() - 3600 * 1000 * 6).toISOString(); */
      const TripUpdated = await Trip.update(body, {
        where: {
          id,
        },
      }, {
        transaction: t,
      });
      await t.commit();
      
      return TripUpdated;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) => `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, 'Errors: \n');
      throw new Error(errorMessage);
    }
  },
  updateByStatus: async (body, id) => {
    try {
      t = await tPostgres();
      body["updated_at"] =  new Date(new Date() - 3600 * 1000 * 6).toISOString();
      const dataTrip = await Trip.findByPk(id,{
        attributes: [
          "statusId",
        ],
      });

      if(dataTrip.statusId == 1){
        const message = "El viaje ha sido actualizado"
        await Trip.update(body, {
          where: {
            id,
          },
        }, {
          transaction: t,
        });
        await t.commit();
        return message;
      }else{
        const message = "El viaje no se puede actualizar"
        return message;
      }
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) => `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, 'Errors: \n');
      throw new Error(errorMessage);
    }
  },

  delete: async (id) => {
    try {
      t = await tPostgres();
     /*  body["updated_at"] =  new Date(new Date() - 3600 * 1000 * 6).toISOString(); */
      const dataTrip = await Trip.findByPk(id,{
        attributes: [
          "statusId",
        ],
      });
      console.log("Información a eliminar",dataTrip)

      if(dataTrip.statusId == 1){
        const message = "El viaje ha sido eliminado"
        await Trip.update({
          active: false,
          updated_at: new Date(new Date() - 3600 * 1000 * 6).toISOString()
        }, {
          where: {
            id,
          }
        }, {
          transaction: t,
        },
        );
        await t.commit();
        return message;
      }else{
        const message = "El viaje no puede ser eliminado"
        return message;
      } 
  
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) => `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, 'Errors: \n');
      throw new Error(errorMessage);
    }
  },
  assign: async(id, body, assignedBy) => 
  {
    try {
      t = await tPostgres();
      body["statusId"]=2;
      body["assignedBy"]=assignedBy;
      body["assignedAt"]=moment().format("YYYY-MM-DD H:mm:ss")
     
    /*   const vehicle = await trip.getDriver(); */
      
     
      const tripAssigned = await Trip.update({
       ...body
      }, {
        where: {
          id,
        }
      }, {
        transaction: t,
      },
      );
      //=====Creacion de folios multiples======
      //+++Obtenemos el maximo valor que fue usado para unir registros
      await  sequelizePostgres.query("SELECT nextval('parity_seq')", {
        raw: true,
        type: QueryTypes.SELECT,
      }).then(async (val)=>
      {const parity=val[0].nextval;
        /* console.log("parity",parity ); */
        let buildFolios=body.folios.map((value) => {
         
          return {id:null,parity:parity,tripId:id,folio:value.folio,folioType:String(value.folioType)}
         
        });
        //console.log("buildFolios",buildFolios)
        //+++Hacemos la insercion multiple
        await TripHasFolio.bulkCreate(buildFolios,{transaction: t});
        
      });
     
    
      await t.commit();
      return tripAssigned;
  
    } catch (error) {
      console.trace(error)
      await t.rollback();
      //const reducer = (acc, ValidationErrorItem) => `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.original;
      throw new Error(errorMessage);
    }
  },
  /*getTotalRounds*/
  getTotalRounds:async(id)=>
  {
 
  
      const trip = await Trip.findByPk(id);
      if(trip.vehicleId)
      {
        const vehicle = await trip.getVehicle();
        const capacity = await (vehicle.getCapacity());
    
        const folios=await trip.getTrips_has_folios();
        mainFolios=folios.map((collection)=>
        {
          return  collection.folioType*10000;
        })
        .reduce((acc, val)=>acc+val,0)
    
        complementFolios=folios.map((collection)=>
        {
          return  collection.folio2Type?collection.folio2Type*10000:0;
        })
        .reduce((acc, val)=>acc+val,0)
    
        totalLiters=mainFolios+complementFolios;
       capacityValue=capacity.dataValues.capacity;
        rounds=Math.floor(totalLiters/capacityValue);
    
      }else{
        rounds=0
      }
       
      console.log("my_round",rounds);
    return {rounds};
   
 
   
    
  },
  unassign: async(id, body) => 
  {
    try {
      t = await tPostgres();

      body["statusId"]=1;
      body["assignedBy"]=null;
      body["assignedAt"]=null;
      body["driverId"]=null;
      body["vehicleId"]=null;
      const round =await require('.').TripService.getTotalRounds(id).rounds;
    
      body["round"]=round>0?round:null;
     
      await TripHasFolio.destroy({
        where: {
          tripId: id
        }
      });
      
      const tripConcluded = await Trip.update({
       ...body
      }, {
        where: {
          id,
        }
      }, {
        transaction: t,
      },
      );
      await t.commit();
      return tripConcluded;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) => `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, 'Errors: \n');
      throw new Error(errorMessage);
    }
  },
  concluded: async(id, body) => 
  {
    try {
      t = await tPostgres();
   
      body["statusId"]=3;
      const tripConcluded = await Trip.update({
       ...body
      }, {
        where: {
          id,
        }
      }, {
        transaction: t,
      },
      );
      await t.commit();
      return tripConcluded;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) => `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, 'Errors: \n');
      throw new Error(errorMessage);
    }
  },
  uploadPhotos: async (createdBy, tripId, body) => {
    try {
      t = await tPostgres();
      const { fileName, fileType, data } = body.photo;
      const PhotoUploaded = Photo.create({
        fileName,
        fileType,
        data,
        createdBy,
        tripId,
        created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
      });

      return PhotoUploaded;
    } catch (error) {
     /*  console.trace(error); */
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  getCountTripsDaily: async (newDate) =>
    Trip.findAll({
      where: {
        active: true,
        [Op.not]: {
          round: null,
        },
        created_at: {
          [Op.gte]: newDate,
        },
      },
      group: ["round"],
      attributes: [[Sequelize.fn("SUM", Sequelize.col("round")), "round"]],
    }).then((data) => {
      suma = data
        .map((value) => {
          return value.dataValues.round;
        })
        .reduce((accum, val) => {
          return parseInt(accum) + parseInt(val);
        }, 0);

      return suma;
    }),
    getCountTripsHistorical: async () =>
    Trip.findAll({
      where: {
        active: true,
        [Op.not]: {
          round: null,
        },
      },
      group: ["round"],
      attributes: [[Sequelize.fn("SUM", Sequelize.col("round")), "round"]],
    }).then((data) => {
      suma = data
        .map((value) => {
          return value.dataValues.round;
        })
        .reduce((accum, val) => {
          return parseInt(accum) + parseInt(val);
        }, 0);

      return suma;
    }),
    getCountLitersDaily: async (newDate) =>
    Trip.findAll({
      attributes: ["id", [
       Sequelize.fn(
         "to_date",
         Sequelize.cast(Sequelize.col("trips.created_at"), "varchar"),
         "YYYY MM DD"
       ),
       "date",
     ],],
      where: {
        active: true,
        [Op.not]: {
          driverId: null,
        },
        created_at: {
          [Op.gte]: newDate,
        },
      },
      
    }).then((data) => {
       //Obtenemos folios
   return Promise.all(
     data.map(async (trip) => {
       try {
         trip.dataValues.folios = await (
           await require(".").TripService.getTripFoliosParity(trip.id)
         ).map((element) => element.folios);
         return await trip;
       } catch (e) {
         return e.toString();
       }
     })
   ).then((data) => {
     return data;
   });
    }),
    getCountLitersMonthly: async (newDate) =>
    Trip.findAll({
      where: {
        active: true,
        [Op.not]: {
          driverId: null,
        },
        created_at: Sequelize.where(Sequelize.cast(Sequelize.col('trips.created_at'),'varchar'),{
          [Op.like]: `${newDate}%`
        })
      },
      attributes: ["id", [
        Sequelize.fn(
          "to_date",
          Sequelize.cast(Sequelize.col("trips.created_at"), "varchar"),
          "YYYY MM DD"
        ),
        "date",
      ],],
    }).then((data) => {
      //Obtenemos folios
  return Promise.all(
    data.map(async (trip) => {
      try {
        trip.dataValues.folios = await (
          await require(".").TripService.getTripFoliosParity(trip.id)
        ).map((element) => element.folios);
        return await trip;
      } catch (e) {
        return e.toString();
      }
    })
  ).then((data) => {
    return data;
  });
   }),
  

};