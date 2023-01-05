const express = require('express');

const { FormatController } = require('../controllers/index.js');
const { verifyToken, roleHasPermissions } = require('../middleware/index.js');
const router = express.Router();

router.get('/invoice/getById/:id', verifyToken, FormatController.getById);
router.get('/excel', verifyToken, FormatController.getExcelDaily);
router.get('/excelByDate', verifyToken, FormatController.excelByDate);
router.get('/excel/totalPiperos', verifyToken, FormatController.totalPiperos);

module.exports = router;
