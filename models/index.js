var PouchDB = require('pouchdb-node');
var _ = require('lodash');

function User(){
self = this;
var db = new PouchDB('hackvotes');

this.setup = function (){

var voted = [];
var doc1,docs;

//Preparing the documents array
doc1 = {_id: 'voted', voted:JSON.stringify(voted)};

docs = [doc1];
//Inserting Documents
	
db.bulkDocs(docs, function(err, response) {

if (err){

	
	console.log('Error,pls try again later','Error');
	console.log(err);

} else {


	console.log('Successfully initialized the database');
	
}

});



};
this.getResult = function (module,id,fn){

db.get(module).then(function (doc) {

console.log(doc[module]);

if(JSON.parse(doc[module])[0] == null){
    
                fn(false);
}else{
    var storearray = [];
    var ranti = [];
    var result = '';
    var length = JSON.parse(doc[module]).length;
  	console.log('Objects: ',JSON.parse(doc[module]));
	

for (var i=0; i< length;i++){

	if(id == 'all'){
console.log(length);
	var just =  JSON.parse(doc[module]);
	var poll_unit = just[i].poll_unit;
	
	var rant = just[i].result;
	
	
	if(_.find(storearray,{name:poll_unit})){
		
		var found = _.find(storearray,{name:poll_unit}).result.push(rant);
		console.log("fdd",found);
		}else{
		var obj = {};
	obj.name = poll_unit;
	obj.result = [just[i].result];
		
		 var jj = storearray.push(obj);
    
	console.log("I am jj",storearray);
	
	}
   
	}else{
  
  if(JSON.parse(doc[module])[i].poll_unit == id){
  	 
    var just =  JSON.parse(doc[module]);
    console.log("I am just ",just[i]);
    var rant = just[i].result;
    storearray.push(rant);
     
  }
}
   if((i+1) == length){
   result = storearray;  
   console.log("I am result",result);
   //fn(200);
   if (storearray.length ==0){
   		fn(false);
    
   }else{
		fn(result);
    
   }

    }
}

}

if(db.put(doc)){
console.log (doc);
	
}else{
		
}

},function (err) {

console.log('Error: ',err);

if(err.name=='not_found'){

console.log(err);

fn(false)

                    }
}); 



};
			
this.checkUuid = function (module,sentuuid,fn){

db.get(module).then(function (doc) {

console.log(doc[module]);

if(JSON.parse(doc[module])[0] == null){
    
                fn(false);
}else{
    
    var length = JSON.parse(doc[module]).length;
  	console.log(JSON.parse(doc[module]));
for (var i=0; i< length;i++){

  if(JSON.parse(doc[module])[i].uuid == sentuuid){
  	console.log("I found it!!!");
    
    fn(true);
  }
    else if((i+1) == length){
    console.log("Not found at all");
    fn(false);
    }
}

}

if(db.put(doc)){
console.log (doc);
	
}else{
		
}

},function (err) {

console.log('Error: ',err);

if(err.name=='not_found'){

console.log(err);

fn(false)

                    }
}); 


};

this.getPolls = function (module,fn){


db.get(module).then(function (doc) {

console.log(doc[module]);

if(JSON.parse(doc[module])[0] == null){
    
                fn(false);
}else{
    
    var length = JSON.parse(doc[module]).length;
  	console.log(JSON.parse(doc[module]));
  	var result = [];
for (var i=0; i< length;i++){

  	result.push(JSON.parse(doc[module])[i].poll_unit);
  	console.log("I found it!!!");
    
   
  
    
}
 fn(_.uniq(result));
}

if(db.put(doc)){
console.log (doc);
	
}else{
		
}

},function (err) {

console.log('Error: ',err);

if(err.name=='not_found'){

console.log(err);

fn(false)

                    }
}); 


}

this.addReport = function (module,itemname,newitem,fn){

db.get(module).then(function (doc) {

console.log(doc[module]);

if(JSON.parse(doc[module])[0] == null){
    
        console.log("First time");
    var just =  JSON.parse(doc[module]) ;
    console.log(just.push(newitem));
    console.log(just);
    doc[module] = JSON.stringify(just);  
        fn(200);
}else{
    
   var length = JSON.parse(doc[module]).length;
   console.log(JSON.parse(doc[module]));
   for (var i=0; i< length;i++){

  		if(JSON.parse(doc[module])[i].uuid == itemname){
    	fn(300);
  }
    else if((i+1) == length){
    
    var just =  JSON.parse(doc[module]) ;
    console.log(just.push(newitem));
    console.log(just);
    doc[module] = JSON.stringify(just);  
    fn(200);
    }
}

}

if(db.put(doc)){
console.log (doc);
	
}else{
		
}

},function (err) {

console.log(err);

if(err.name=='not_found'){

console.log(err);

fn(400)

                    }
}); 


};


}

var User = new User();
module.exports = User;

