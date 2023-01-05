const express = require("express");
const { verifyToken } = require("../middleware/index.js");
const {CatalogController} = require("../controllers/index.js");
const router = express.Router();


router.get("/catalog/capacity/getAll", verifyToken, CatalogController.getAllCapacity);
router.get("/catalog/dependency/getAll", verifyToken, CatalogController.getAllDependency);
router.get('/catalog/settlement/getAll', verifyToken, CatalogController.getAllSettlement); 
router.get('/catalog/status/getAll', verifyToken, CatalogController.getAllStatus); 

/* router.get("/catalog/location/getAll",verifyToken,CatalogController.getAllLocation);
router.get("/catalog/road/getAll",verifyToken,CatalogController.getAllRoad);
router.get("/catalog/reason/getAll",verifyToken,CatalogController.getAllReason);
router.get("/catalog/diameter/getAll",verifyToken,CatalogController.getAllDiameter);
router.get("/catalog/types/getAll",verifyToken,CatalogController.getAllTypes);
router.get("/catalog/municipality/getAll", verifyToken, CatalogController.getAllMunicipalities);
router.get("/catalog/settlement/getAll", verifyToken, CatalogController.getAllSettlements);
router.get("/catalog/types/getById/:id", verifyToken, CatalogController.getByIdTypes);
router.get("/catalog/settlement/getByMunicipality/:id", verifyToken, CatalogController.getSettlementsByMunicipality);
router.get("/catalog/sector/getByMunicipality/:id", verifyToken, CatalogController.getSectorsByMunicipality);
router.get("/catalog/settlement/getByZipCode/:zipcode", verifyToken, CatalogController.getSettlementsByZipCode);
router.get("/catalog/otherReason/getById/:id", verifyToken, CatalogController.getByIdOtherReason);
router.get("/catalog/municipality/getAllGeoShape", verifyToken, CatalogController.getAllMunicipalitiesShapes);
router.get("/catalog/municipality/:municipality_id/:type", verifyToken, CatalogController.getAllBySublayer); */

module.exports=router;
