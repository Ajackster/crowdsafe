//Dependencies
var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var path = require('path');
var handlebars = require('handlebars');

var db = require('./configDB/configDB.js');
var client = new pg.Client(db.url);
client.connect();
var app = express();

//Setting port
app.set('port', process.env.PORT || 3000);
var port = app.get('port');
//var ip = '192.168.0.115';

//Using static files such as client-side javascript, css, and html.
app.set('views', __dirname + '/public');
app.engine('html', require('consolidate').handlebars);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

//using bodyParser in order to get variables from input data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/androidTest', function(req, res){
	var json = JSON.parse(req.body.string);
	res.json(json);
});

app.get('/androidTest', function(req, res){
	res.send("Hello");
});

app.post('/agression', function (req, res){
  var data = {
    report : req.body.reType,
    subreport : req.body.subreType,
    text : req.body.txtField
  };
  try{
    client.query("INSERT INTO agression(reportdescription, photovdo) values($1, $2)", [data.report, data.text]);
    console.log("Inserted into reports, report: " + data.report + ", subreport: " + data.subreport + ", text: ");
  }catch(err){
    console.log("fail : " + err.message);
  }


  res.redirect('/success');
});

//Medical report data
app.post('/medical', function (req, res){
  var data = {
    report : req.body.reType,
    subreport : req.body.subreType,
    text : req.body.txtField
  };
  try{
    client.query("INSERT INTO medical(report, subreport, text) values($1, $2, $3)", [data.report, data.subreport, data.text]);
    console.log("Inserted into reports, report: " + data.report + ", subreport: " + data.subreport + ", text: " + data.text);
  }catch(err){
    console.log("fail : " + err.message);
  }


  res.redirect("/success");
});

//Missing report data
app.post('/missing', function (req, res){
  var data = {
    report : req.body.reType,
    subreport : req.body.subreType,
    text : req.body.txtField
  };
  try{
    client.query("INSERT INTO missing(report, subreport, text) values($1, $2, $3)", [data.report, data.subreport, data.text]);
    console.log("Inserted into reports, report: " + data.report + ", subreport: " + data.subreport + ", text: " + data.text);
  }catch(err){
    console.log("fail : " + err.message);
  }


  res.redirect("/success");
});

//Sanitary report data
app.post('/sanitary', function (req, res){
  var data = {
    report : req.body.reType,
    subreport : req.body.subreType,
    text : req.body.txtField
  };
  try{
    client.query("INSERT INTO sanitary(report, subreport, text) values($1, $2, $3)", [data.report, data.subreport, data.text]);
    console.log("Inserted into reports, report: " + data.report + ", subreport: " + data.subreport + ", text: " + data.text);
  }catch(err){
    console.log("fail : " + err.message);
  }


  res.redirect("/success");
});

//Suspicion report data
app.post('/suspicion', function (req, res){
  var data = {
    report : req.body.reType,
    subreport : req.body.subreType,
    text : req.body.txtField
  };
  try{
    client.query("INSERT INTO suspicion(report, subreport, text) values($1, $2, $3)", [data.report, data.subreport, data.text]);
    console.log("Inserted into reports, report: " + data.report + ", subreport: " + data.subreport + ", text: " + data.text);
  }catch(err){
    console.log("fail : " + err.message);
  }


  res.redirect("/success");
});

app.get('/success', function(req, res){
  res.render('reportsuccess.html')
});

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

//module.exports = app;

app.listen(port, function() {
  console.log('Server started on http://(website):' + port);
});
