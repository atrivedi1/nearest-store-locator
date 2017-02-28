'use strict'

//dependencies
var dotenv = require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');

console.log("process", process.env.GOOGLE_KEY);

//create instance of express
var app = express();

//middleware
app.use(express.static('client'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
  
//connect on routes
require('./server/routes.js')(app)

//set up port to listen on
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Store locator listening on port ' + port + '!');
});