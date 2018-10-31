const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const hbs = require('express-handlebars');

const routes = require('./routes/api.js');
const Middleware = require('./middlewares/api.js');
const UserController = require('./controllers/api.js');; 

//view engine setup
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout'}));
app.set('view engine','hbs');

app.use(cors());
//For session handling
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

//For including statis files i.e. scripts and styles
app.use('/api',routes);


//404 route
app.get('*',function(req,res){
	res.send({err_mes:'Not permitted',error:'GET'});
	//res.sendFile(__dirname+"/pages/examples/"+'404.html')
});
app.post('*',function(req,res){
	res.send({err_mes:'Not permitted',error:'POST'});
	//res.sendFile(__dirname+"/pages/examples/"+'404.html')
});

var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
console.log(host+"Example app listening at http://127.0.0.1:8081");
});
var http = require('http').Server(app);


