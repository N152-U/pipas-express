/**
 * Pipa Routers
 * @module src/routers/PipaRouter
 * @name PipaRouter
 * @author Andrea Naraly Solis Martinez
 * @requires express
 * @requires module:PipaController
 */

const express = require('express');
const { PipaController } = require('../controllers/index.js');
const { verifyToken } = require('../middleware/index.js');
const { PipaValidator } = require('../validators/index.js');
const {debugReq} = require('../utils/helpers.js');


const router = express.Router();

router.post('/pipa/create', PipaValidator.create, verifyToken, PipaController.create);
router.get('/pipa/getAll', verifyToken, PipaController.getAll);
router.get('/pipa/getById/:id', verifyToken, PipaController.getById);
router.put('/pipa/update/:id', PipaValidator.update,verifyToken, PipaController.update);
router.delete('/pipa/delete/:id', verifyToken, PipaController.delete);



module.exports = router;
