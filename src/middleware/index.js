/**
 * Delivery Detail Routers
 * @module src/middleware/index
 * @name MiddlewareIndex
 * @author Alan Escamilla Mondragón
 */
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const APIError = require('../utils/error');
const { RoleService, UserService } = require('../services');
const { UserController } = require('../controllers');

module.exports = {
  logDate: (req, res, next) => {
    const date = new Date();
    // eslint-disable-next-line no-console
    console.log(`${date.toLocaleTimeString()}`);
    next();
  },
  /**
 * Create a Delivery Detail
 * @name module:MiddlewareIndex.VerifyToken
 * @service VERIFYTOKEN
 * @code {401} User Not Authorized
 * @auth This route requires Bearer Token Authorization.
 *      If Authorization fails it will return a 401 error.
 */
  verifyToken(req, res, next) {
    // Verificamos si el token fue firmado con nuestro secreto
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.decoded = decoded;
        next();
      } else {
        throw new APIError('Not Authorized', 401);
      }
    } catch (error) {
      res.status(401).send(error.message);
    }
  },
  roleHasPermissions: (...permissions) => {
    /* Middleware para comprobar los permisos con los que cuenta quien envia la peticion
        dentro del bearer y se comprueba en la base */
    const isSubset = function (piece, wholeArray) {
      /*   console.log(piece)
              console.log(wholeArray) */
      return piece.every((val) => wholeArray.indexOf(val) >= 0);
    };
    return async (req, res, next) => {
      try {
        const user = await UserService.findOneByHashWithRolePermissions(req.decoded.hash);
               /*  console.log(user!=null)
                        console.log(user.role)
                console.log(user.permissions)
                console.log(permissions) */
        if (user != null && (isSubset(permissions, user.permissions) || user.role === 'ADMIN')) {
          req.user = user;
          next();
        } else {
          res.status(403).send({
            message: 'Not Authorized',
          });
        }
      } catch (error) {
        if (process.env.DEBUG) console.trace(error);

        res.status(500).send({
          message: 'Error Contact TI Team',
        });
      }
    };
  },
  // eslint-disable-next-line no-unused-vars
  errorHandler: (err, req, res, next) => {
    console.error(err.stack);
    const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' });
    accessLogStream.write(`${err.stack} \n`, 'utf8');
    accessLogStream.end();
    // eslint-disable-next-line no-console
    if (err instanceof APIError) {
      res
        .status(err.statusCode)
        .json({ errorCode: err.statusCode, message: err.message });
    } else {
      res
        .status(500)
        .json({ errorCode: 500, message: err.message });
    }
  },
};
