const express = require('express');
const { UserValidator } = require('../validators/index.js');
const { TripController } = require('../controllers/index.js');
const { verifyToken, roleHasPermissions } = require('../middleware/index.js');
const router = express.Router();

router.post('/trip/create', verifyToken, TripController.create);
router.get('/trip/getAll', verifyToken, TripController.getAll);
router.get('/trip/getAllDaily', verifyToken, TripController.getAllDaily);
router.get('/trip/:id/getCollaborator', verifyToken, TripController.getByIdCollaborator);
router.get('/trip/:id/getCollaboratorDriver', verifyToken, TripController.getCollaboratorDriver);
router.get('/trip/getAllEco', verifyToken, TripController.getAllEco);
router.get('/trip/getById/:id', verifyToken, TripController.getById);
router.put('/trip/update/:id', verifyToken, TripController.update);
router.put('/trip/:id/updateByStatus', verifyToken, TripController.updateByStatus);
router.delete('/trip/delete/:id', verifyToken, TripController.delete);
router.put('/trip/:id/assign', verifyToken, TripController.assign);
router.put('/trip/:id/unassign', verifyToken, TripController.unassign);
router.put('/trip/:id/conclude', verifyToken, TripController.concluded);
router.get('/trip/:id/detailGetById', verifyToken, TripController.detailGetByIdTrip);
router.get("/trip/getTotalCountDaily", verifyToken, TripController.getTotalCountDaily);
router.get("/trip/getTotalCount", verifyToken, TripController.getTotalCount);
router.get('/trip/getRecordsBetweenDates/:startDate/:endDate', verifyToken, TripController.getRecordsBetweenDates);
router.get('/trip/getCountVehicle', verifyToken, TripController.getCountVehicle);
router.get('/trip/:id/getTotalRounds', verifyToken, TripController.getTotalRounds);
router.get('/trip/getCountTripsDaily', verifyToken, TripController.getCountTripsDaily);
router.get('/trip/getCountTripsHistorical', verifyToken, TripController.getCountTripsHistorical);

router.get('/trip/getCountLitersDaily', verifyToken, TripController.getCountLitersDaily);
router.get('/trip/getCountLitersMonthly', verifyToken, TripController.getCountLitersMonthly);




module.exports = router;