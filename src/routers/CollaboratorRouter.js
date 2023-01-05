/**
 * Role Routers
 * @module src/routers/RoleRouter
 * @name RoleRouter
 * @author Andrea Naraly Solis Martinez
 * @requires express
 * @requires module:RoleController
 */

 const express = require('express');
 const { CollaboratorController } = require('../controllers/index.js');
 const { verifyToken, roleHasPermissions } = require('../middleware/index.js');
 const { CollaboratorValidator } = require('../validators/index.js');
 
 const router = express.Router();
 

 router.post('/collaborator/create', CollaboratorValidator.create,  verifyToken, CollaboratorController.create);
 router.get('/collaborator/getById/:id', verifyToken, CollaboratorController.getById);
 router.get('/collaborator/getAll', verifyToken, CollaboratorController.getAll);
 router.put('/collaborator/update/:id', CollaboratorValidator.update, verifyToken, CollaboratorController.update);
 router.delete('/collaborator/delete/:id', verifyToken,CollaboratorController.delete);
 router.get("/collaborator/:id/getAllSettlement", verifyToken, CollaboratorController.getSettlementsByCollaborator);

 module.exports = router;