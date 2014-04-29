var http = require('http');
var express = require('express');
var crypto = require('crypto');

var qs = require('querystring');

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());

var data = {};

app.use(function (req, res, next) {
  console.log('with base');
  console.log('--------------REQ.BODY--------------');
  console.log(req.body);
  next();
});

app.post('*', function (req, res, next) {
  console.log('--------------REQ.BODY--------------');
  console.log(req.body);
  res.send(200, "OK");
});

app.get('*', function (req, res, next) {
  var challenge = qs.parse(req.url.split('?')[1]).challenge;
  if (challenge) {
    var sig = req.get('X-Dropbox-Signature');
    var encrypted = crypto.createHmac('SHA256', 'z1zabgu79hxrwc3').update('dbx').digest('hex').toString();
    if (encrypted === sig) {
      res.send(challenge);
    } else {
      res.send(400);
    }
  } else {
    res.json(data);
    res.end();
  }
});

app.listen(process.env.PORT);
