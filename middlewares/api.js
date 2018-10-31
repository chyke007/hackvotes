function Middleware(){
	this.checkSignIn = function (req,res,next){
	console.log(req.session.user);
	if(req.session.user){
		next();
	}else{
		var err = new Error('Logged in');
		console.log('Logged in');
		next(err);
	}

};
	this.rejectLogView = function rejectLogView(req,res,next){
console.log(req.session.user);
	if(req.session.user){
		var err = new Error('Not logged in');
		console.log(req.session.user);
		next(err);
		
	}else{
		next();
	}

}

}

var Middleware = new Middleware();
module.exports = Middleware;