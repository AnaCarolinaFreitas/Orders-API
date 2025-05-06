 const express = require ("express");
 const router = express.Router();
 const reportController = require("../controllers/reportController");
 const apiKeyMiddleware = require("../config/apiKey");

 router.use(apiKeyMiddleware);
 router.get("/report/pdf/order", reportController.exportOrderPdf);
 router.get("/report/pdf/client", reportController.exportClientsPdf);
 
 module.exports = router;