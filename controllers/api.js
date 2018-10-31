var ApiModel = require('../models/index.js');
var path = require('path');
var _ = require('loadash');

function Api(){
self = this;


this.checkuuid = function(req, res){
//ApiModel.setup();
var events = ApiModel.checkUuid('voted',req.params.id.toLowerCase(),function(response){
       if(response){
       		res.send({status:true});
}else{
			res.send({status:false});
}

    });
 	
}; 

this.report = function(req, res){
	
	console.log("I am body name",req.body);
if(	!req.body.name || !req.body.sex || !req.body.poll_unit|| !req.body.lga ||!req.body.state|| !req.body.result ||!req.body.uuid
  
  ){

	res.send({status:100,result:'All fields are required'});

	}else{


	var name = req.body.name.toLowerCase();
	var sex = req.body.sex.toLowerCase();
	var poll_unit = req.body.poll_unit.toLowerCase();
	var lga = req.body.lga.toLowerCase();
	var state = req.body.state.toLowerCase();
	var result = req.body.result;
	var uuid = req.body.uuid.toLowerCase();
	
	var newitem = {
		name:name,
		sex:sex,
		poll_unit:poll_unit,
		lga:lga,
		state:state,
		result:result,
		uuid:uuid
	};

	ApiModel.addReport('voted',uuid,newitem,function(response){
       
       if(response == 200){
			console.log("The user has successfuly reported!");
			res.send({status_code:200});

		}else if(response == 300){
			
			console.log("Sorry the user has already reported before");
			res.send({status_code:300});	
		
		}else{
			
			console.log("An error occured when storing report");
			res.send({status_code:400});		

}

    });
	
	

	}
	


};

this.verifyReport = function(objArray){
var objArray = JSON.parse(objArray);
var arrofres = [];
//for pdp
var tagArray = _.pluck(objArray,'pdp'); //create an array of tag values from the object array
var mostCommonTag = _.chain(tagArray).countBy().pairs().max(_.last).head().value(); //find the most commonly occurring tag value
arrofres.push({pdp:mostCommonTag});
//for apc
var tagArray = _.pluck(objArray,'apc'); //create an array of tag values from the object array
var mostCommonTag = _.chain(tagArray).countBy().pairs().max(_.last).head().value(); //find the most commonly occurring tag value
arrofres.push(({apc:mostCommonTag});
//for apga
var tagArray = _.pluck(objArray,'apga'); //create an array of tag values from the object array
var mostCommonTag = _.chain(tagArray).countBy().pairs().max(_.last).head().value(); //find the most commonly occurring tag value
arrofres.push(({apga:mostCommonTag});
//for lp
var tagArray = _.pluck(objArray,'lp'); //create an array of tag values from the object array
var mostCommonTag = _.chain(tagArray).countBy().pairs().max(_.last).head().value(); //find the most commonly occurring tag value
arrofres.push(({lp:mostCommonTag});
//for adc
var tagArray = _.pluck(objArray,'adc'); //create an array of tag values from the object array
var mostCommonTag = _.chain(tagArray).countBy().pairs().max(_.last).head().value(); //find the most commonly occurring tag value
arrofres.push(({adc:mostCommonTag});
	return arrofres;
};


this.resultByState =  function (req, res) {
if(	!req.body.state){

	res.send({status:100,result:'All fields are required'});

	}else{

	var state = req.body.state.toLowerCase();
	
	ApiModel.getResult('voted','state',state,function(response){
			if(response){

				var result = verifyReport(response);
				res.send(status_code:200,result:result);


			}else{
				console.log("An error occured when storing report");
				res.send({status_code:400});	
			}
			});
}

};

this.resultByLga =  function (req, res) {

	if(	!req.body.lga){

	res.send({status:100,result:'All fields are required'});

	}else{

	var lga = req.body.lga.toLowerCase();
	
	ApiModel.getResult('voted','lga',lga,function(response){
			if(response){

				var result = verifyReport(response);
				res.send(status_code:200,result:result);


			}else{
				console.log("An error occured when storing report");
				res.send({status_code:400,result:"Unknown Error"});	
			}
		
	});
}


};

this.resultByPu =  function (req, res) {

if(	!req.body.poll_unit){

	res.send({status:100,result:'All fields are required'});

	}else{

	var poll_unit = req.body.poll_unit.toLowerCase();
	
	ApiModel.getResult('voted','poll_unit',poll_unit,function(response){
			if(response){

				var result = verifyReport(response);
				res.send(status_code:200,result:result);


			}else{
				console.log("No result found");
				res.send({status_code:300,result:"No results found"});	
			}
		
	});
}


};


}

var Api = new Api();
module.exports = Api;

