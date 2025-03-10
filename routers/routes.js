const express = require('express')
const router = express.Router();

const routesController = require('../controllers/controller_routes')

// index visualizza tutti gli elementi
router.get('/', routesController.index);

// show visualizza un elemento per id
router.get('/:id', routesController.show);

module.exports = router;