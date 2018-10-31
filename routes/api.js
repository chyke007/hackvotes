var express = require('express');
var router = express.Router();
//var Middleware = require('./Middleware/api.js');
var ApiController = require('../controllers/api.js');; 
	
//Verifing uuid route
router.get('/check/:id',ApiController.checkuuid);

//Reporting route
router.post('/report',ApiController.report);

//Result route
router.get('/result/state/:id',ApiController.resultByState);
router.get('/result/lga/:id',ApiController.resultByLga);
router.get('/result/pu/:id',ApiController.resultByPu);

module.exports = router;