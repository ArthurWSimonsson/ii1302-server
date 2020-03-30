var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Cloudant = require('@cloudant/cloudant');
var cfenv = require('cfenv');

var messageRouter = require('./routes/message');

var appEnv = cfenv.getAppEnv();


var cloudant = new Cloudant({ url: 'https://853610f6-18bb-4d0c-8802-b446227c8433-bluemix:6fe4b30085d2489fbee7bca1a4580684704e1badbf10e1cad08c9b97797b3390@853610f6-18bb-4d0c-8802-b446227c8433-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'dRikbsmp9ytx9ieU5BhvVySAOnl3AhWpijEncQhIQFNH' } } });

var db = cloudant.db.use('ii1302');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', messageRouter);


app.listen(appEnv.port, '0.0.0.0', function() {

  // print a message when the server starts listening
  //console.log("test", db)
  console.log("server starting on " + appEnv.url);
});



module.exports = {db};