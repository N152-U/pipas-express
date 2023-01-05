const {
  Trip,
  Collaborator,
  Settlement,
  Driver,
  DriverHasVehicle,
  Vehicle,
  Dependency,
  tPostgres,
  sequelizePostgres,
} = require('../models/index.js');

const { Sequelize,QueryTypes } = require('sequelize');
const nowDate = new Date();
const newDate = nowDate.getFullYear()+'/'+nowDate.getDate()+'/'+(nowDate.getMonth()+1);
let t;
module.exports = {
  getById: async (id) =>
    Trip.findByPk(id, {
      attributes: [
        'folio',
        'folio2',
        'street',
        'garza',
        'hour',
        'date',
        [Sequelize.fn('date_part', 'month', Sequelize.col('date')), 'month'],
        [Sequelize.fn('date_part', 'day', Sequelize.col('date')), 'day'],
        [Sequelize.fn('date_part', 'year', Sequelize.col('date')), 'year'],
      ],
      where: {
        active: true,
      },

      include: [
        {
          model: Collaborator,
          as: 'collaborator',
          attributes: ['settlementsId'],
          where: {
            active: true,
          },
          required: true,
          include: [
            {
              model: Settlement,
              as: 'settlement',
              attributes: ['settlement', 'd_mnpio'],
              where: {
                active: true,
              },
              required: true,
            },
          ],
        },
        {
          model: Driver,
          as: 'driver',
          attributes: ['firstName'],
          where: {
            active: true,
          },
          required: true,
          include: [
            {
              model: DriverHasVehicle,
              as: 'drivers',
              attributes: ['driverId'],
              required: true,
              include: [
                {
                  model: Vehicle,
                  as: 'vehicles',
                  attributes: ['placa', 'capacity'],
                  required: true,
                  include: [
                    {
                      model: Dependency,
                      as: 'dependencies',
                      attributes: ['name'],
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

  getExcelDaily: async () => Trip.findAll({
    
    attributes: [
      'folio',
      'folio2',
      'street',
      'garza',
      'hour',
      'date',
      'round',
      [Sequelize.fn('date_part', 'month', Sequelize.col('date')), 'month'],
      [Sequelize.fn('date_part', 'day', Sequelize.col('date')), 'day'],
      [Sequelize.fn('date_part', 'year', Sequelize.col('date')), 'year'],
    ],
    where: {
      active: true,
      date: newDate,
    },

    include: [
      {
        model: Collaborator,
        as: 'collaborator',
        attributes: ['settlementsId', 'firstName'],
        where: {
          active: true,
        },
        required: true,
        include: [
          {
            model: Settlement,
            as: 'settlement',
            attributes: ['settlement', 'd_mnpio'],
            where: {
              active: true,
            },
            required: true,
          },
        ],
      },
      {
        model: Driver,
        as: 'driver',
        attributes: ['firstName'],
        where: {
          active: true,
        },
        required: true,
        include: [
          {
            model: DriverHasVehicle,
            as: 'drivers',
            attributes: ['driverId'],
            required: true,
            include: [
              {
                model: Vehicle,
                as: 'vehicles',
                attributes: ['placa', 'capacity'],
                required: true,
                include: [
                  {
                    model: Dependency,
                    as: 'dependencies',
                    attributes: ['name'],
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }),

  getExcelByDate: async (body) => {
    const query = `select min(res1.id) as first_trip_id, res1.fecha, res1.street, c.first_name as nombre_enlace,   s.settlement as colonia, d.first_name as nombre_pipero,
    d.phone_number as phone_number_pipero, v.capacity as capacity, v.placa as placas, v.eco as economico,
    count(*) as viajes, string_to_array(string_agg(trim(from concat(res1.folio::varchar(255),' ',res1.folio2::varchar(255))), '|'), '|') as folios from
    (select t.id, t.date as fecha, t.street, t.folio, t.folio2, t.collaborators_id,t.drivers_id from trips as t
      where t.date = :date order by folio desc
    ) as res1 
    inner join collaborators as c on res1.collaborators_id=c.id
    inner join drivers as d on res1.drivers_id=d.id
    inner join drivers_vehicles as dv on res1.drivers_id = dv.drivers_id
    INNER JOIN vehicles AS v on dv.vehicles_id = v.id 
    inner join settlements as s on c.settlements_id=s.id
    group by res1.fecha, c.id, d.id, s.id, res1.street,v.capacity,v.placa,v.eco
    order by first_trip_id;`;

    return sequelizePostgres.query(query, {
      raw: true,
      replacements: { date: body.date },
      type: QueryTypes.SELECT,
    });
  },

  totalPiperos: async (body) => Trip.findAll({

    attributes: [
      [Sequelize.literal('COUNT(DISTINCT(drivers_id))'), 'totalPiperos']],

    where: {
      active: true,
      date: body.date,
    },
    raw: true,

  }),
};
