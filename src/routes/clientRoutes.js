const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const upload = require('../config/upload');
const apiKeyMiddleware = require("../config/apiKey");

router,use(apiKeyMiddleware);
router.get('/', clientController.getClient);
router.get('/:id', clientController.getClientById);
router.post('/', upload.single("profile"), clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;