const express = require('express');
const cors = require('cors');
// const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const celebrate = require('celebrate');
const { logDate, errorHandler } = require('../middleware/index.js');

const app = express();
const PORT = process.env.APP_PORT || 4000;
app.use(morgan('dev'));
app.use(cors());
app.use(logDate);
app.use(express.json({ extended: true,limit: "50mb" }));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/index.html`));
});
app.get('/public/doc/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../..${req.originalUrl}`));
});
console.log(`Consulta API en: http://127.0.0.1:${PORT}/${process.env.APP_NAME}/api/v${process.env.APP_VERSION}`)
console.log('Fecha del servidor: ',new Date().toString());
app.use(`/${process.env.APP_NAME}/api/v${process.env.APP_VERSION}`, require('../routers/index.js'));

app.use(celebrate.errors());
app.use(errorHandler);

module.exports = {
  app,
  PORT,
};
