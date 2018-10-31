var express = require('express');
var router = express.Router();
//var Middleware = require('./Middleware/api.js');
var ApiController = require('../controllers/api.js');; 
	
//Verifing uuid route
router.get('/check/:id',ApiController.checkuuid);

//Reporting route
router.post('/report',ApiController.report);

//Result route
router.post('/result/state/:id',ApiController.resultByState);
router.post('/result/lga/:id',ApiController.resultByLga);
router.post('/result/pu/:id',ApiController.resultByPu);

module.exports = router;