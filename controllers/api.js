var ApiModel = require('../models/index.js');
var path = require('path');
var _ = require('lodash');

function Api(){
self = this;


this.checkuuid = function(req, res){
//ApiModel.setup();
//return false;
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

this.verifyReport = function(objArray,fn){
var objArray = objArray;
console.log(objArray);
var arrofres = [];
//for pdp
var tagArray = _.map(objArray,function(party){
	return party.pdp;
}); //create an array of tag values from the object array
console.log(tagArray);
console.log("chains",_.head(_(tagArray).countBy().entries().maxBy('[1]')));
var mostCommonTag = _.head(_(tagArray).countBy().entries().maxBy('[1]')); //find the most commonly occurring tag value
arrofres.push({pdp:mostCommonTag});
console.log(arrofres);
//for apc
var tagArray = _.map(objArray,function(party){
	return party.apc;
}); //create an array of tag values from the object array
var mostCommonTag = _.head(_(tagArray).countBy().entries().maxBy('[1]')); //find the most commonly occurring tag value
arrofres.push({apc:mostCommonTag});
//for apga
var tagArray = _.map(objArray,function(party){
	return party.apga;
}); //create an array of tag values from the object array
var mostCommonTag = _.head(_(tagArray).countBy().entries().maxBy('[1]')); //find the most commonly occurring tag value
arrofres.push({apga:mostCommonTag});
//for lp
var tagArray = _.map(objArray,function(party){
	return party.lp;
}); //create an array of tag values from the object array
var mostCommonTag = _.head(_(tagArray).countBy().entries().maxBy('[1]')); //find the most commonly occurring tag value
arrofres.push({lp:mostCommonTag});
//for adc
var tagArray = _.map(objArray,function(party){
	return party.adc;
}); //create an array of tag values from the object array
var mostCommonTag = _.head(_(tagArray).countBy().entries().maxBy('[1]')); //find the most commonly occurring tag value
arrofres.push({adc:mostCommonTag});

console.log("ss:",arrofres);
var jj ={
	pdp:Number(arrofres[0].pdp),
	apc:Number(arrofres[1].apc),
	apga:Number(arrofres[2].apga),
	adc:Number(arrofres[3].lp),
	lp:Number(arrofres[4].adc)
}
console.log("jj",jj);
fn(jj);
};

this.getPolls =  function (req, res){
ApiModel.getPolls('voted',function(response){
			if(response){

			res.send({status:200,result:response});

			}else{
				res.send({status:400,result:'Unknown error'});

			}
	});

};

this.resultAll =  function (req, res) {
	var value = '';
if(!req.params.id){

	res.send({status:100,result:'All fields are required'});

	}else{

	var stateorall = req.params.id.toLowerCase();
	
	ApiModel.getResult('voted',stateorall,function(response){
	
			if(response){
				if(stateorall == 'all'){
				var es_po_arr_1 = [];
				for(var j=0;j<response.length;j++){
				var es_po = response[j].result;
				console.log("dd",es_po);
				self.verifyReport(es_po,function(response2){
					if(response2){
					es_po_arr_1.push(response2);
				//console.log("Results:",result);
				//res.send({status_code:200,result:result});

					}else{
				res.send({status_code:400,result:'Error'});

					}
				
				});
			}
					var output =_(es_po_arr_1).groupBy().map((objs, key) => ({
        pdp: _.sumBy(objs, 'pdp'),
        apc: _.sumBy(objs, 'apc'),
        apga: _.sumBy(objs, 'apga'),
        lp: _.sumBy(objs, 'lp'),
        adc: _.sumBy(objs, 'adc') })).value();

			console.log("Results:",output);
			res.send({status_code:200,result:output});

				
				}else{

						console.log("Result first",response);
				self.verifyReport(response,function(response2){
					if(response2){
					var result = response2;
				console.log("Results:",result);
				res.send({status_code:200,result:result});

					}else{
				res.send({status_code:400,result:'Error'});

					}
				
				});
					
				}
				

			}else{
				console.log("An error occured when storing report");
				res.send({status_code:400});	
			}
			});
}

};

this.resultState =  function (req, res) {

	if(!req.params.id){

	res.send({status:100,result:'All fields are required'});

	}else{

	var lga = req.params.id.toLowerCase();
	
	ApiModel.getResult('voted','lga',lga,function(response){
			if(response){
console.log("Result first",response);
				self.verifyReport(response,function(response2){
					if(response2){
					var result = response2;
				console.log("Results:",result);
				res.send({status_code:200,result:result});

					}else{
				res.send({status_code:400,result:'Error'});

					}
				
				});


			}else{
				console.log("An error occured when storing report");
				res.send({status_code:400,result:"Unknown Error"});	
			}
		
	});
}


};


}

var Api = new Api();
module.exports = Api;

