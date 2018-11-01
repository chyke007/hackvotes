var express = require('express');
var router = express.Router();
//var Middleware = require('./Middleware/api.js');
var ApiController = require('../controllers/api.js');; 
	
//Verifing uuid route
router.get('/check/:id',ApiController.checkuuid);

//Reporting route
router.post('/report',ApiController.report);

//Get all pollling units
router.get('/polls',ApiController.getPolls);


//Result route
router.get('/result/:id',ApiController.resultAll);
router.get('/result/state/:id',ApiController.resultState);
router.get('/result/pu/:id',ApiController.resultAll);

module.exports = router;