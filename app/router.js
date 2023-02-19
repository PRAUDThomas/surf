const express = require('express');
const controller = require('./controllers/mainController');

const router = express.Router();

router.get('/', controller.home);

router.get('/surfer/:id', controller.surfer);

router.get('/brands', controller.brands)

// url : localhost:3030/brand/Universal
router.get('/brands/:name', controller.brand)

router.get('/search', controller.search)

module.exports = router;