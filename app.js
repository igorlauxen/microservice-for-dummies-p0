var express = require('express');
var app = express();
var timeout = require('connect-timeout'); //express v4
const cote = require('cote');
const client = new cote.Requester({ name: 'TimeClientServer' });
const port = 3000;

//timeout handling for REST calls, this impacts only the express calls
app.use(haltOnTimedout);
app.use(timeout('5s'));

function haltOnTimedout(req, res, next){
  if (!req.timedout){
  	next();
  }else{
  	res.send('Your request has timeout, please review!');
  }
}
 
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/time', function(req, res){
	//wait 1second before sending a timeout for the screen
	client.send({ type: 'time', __timeout: 1000 }, (time) => {
	    res.send('The time now is: '+time);
	});
});

//if you don't understand what they say, throw a 404
app.get('*', function(req, res){
  res.send('what???', 404);
});

//init app
app.listen(port, function () {
  console.log('Example app listening on port '+port+'!, please call localhost:'+port+'/ on your browser');
});