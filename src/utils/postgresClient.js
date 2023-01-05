const { Sequelize } = require('sequelize');

const sequelizePostgres = new Sequelize(
  process.env.DB_PSQL,
  process.env.USER_PSQL,
  process.env.PASSWORD_PSQL,
  {
    host: process.env.HOST_PSQL,
    port: process.env.PORT_PSQL,
    dialect: 'postgres',
    dialectOptions: {
      options: {
        useUTC: false, // for reading from database
        encrypt: false,
        validateBulkLoadParameters: true,
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            console.log("campo",field)
            return field.string()
          }
            return next()
          },
      },
   
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    timezone: '-06:00'
  },
);

sequelizePostgres
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelizePostgres;
