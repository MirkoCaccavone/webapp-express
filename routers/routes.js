const express = require('express')
const router = express.Router();

// importiamo il middleware per la gestione file 
const upload = require('../middleware/multer')

const routesController = require('../controllers/controller_routes')

// index visualizza tutti gli elementi
router.get('/', routesController.index);

// show visualizza un elemento per id
router.get('/:id', routesController.show);

// strore review
router.post('/:id/reviews', routesController.storeReview);

router.post('/', upload.single('image'), routesController.store);


module.exports = router;