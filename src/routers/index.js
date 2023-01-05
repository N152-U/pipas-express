const express = require('express');
const AuthRouter = require('./AuthRouter.js');
const RoleRouter = require('./RoleRouter.js');
const PermissionRouter = require('./PermissionRouter.js');
const CollaboratorRouter = require('./CollaboratorRouter.js');
const PipaRouter = require('./PipaRouter.js');
const TripsRouter = require('./TripRouter.js');
const FormatRouter = require('./FormatRouter.js');
const CatalogRouter = require('./CatalogRouter.js');

const router = express.Router();

router.use(AuthRouter);
router.use(RoleRouter);
router.use(PermissionRouter);
router.use(CollaboratorRouter);
router.use(PipaRouter);
router.use(TripsRouter);
router.use(FormatRouter);
router.use(CatalogRouter);

module.exports = router;
