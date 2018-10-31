var PouchDB = require('pouchdb-node');

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
this.getResult = function (module,key,id,fn){

db.get(module).then(function (doc) {

console.log(doc[module]);

if(JSON.parse(doc[module])[0] == null){
    
                fn(false);
}else{
    const storearray = [];
    var result = '';
    var length = JSON.parse(doc[module]).length;
  	console.log(JSON.parse(doc[module]));
for (var i=0; i< length;i++){

  if(JSON.parse(doc[module])[i][key] == id){
  	 
    var just =  JSON.parse(doc[module]) ;
    console.log(storearray.push(just[i]));
     
  }
    else if((i+1) == length){
   result = JSON.stringify(storearray);  
   
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

