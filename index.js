// index.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const requestIp = require('request-ip');
const accepts = require("accepts");
const userAgent = require("useragent");

const app = express();

//use the request-ip middleware
app.use(requestIp.mw());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  
  const ipaddress = req.clientIp;
//parse the 'Accepts-Language' header of the request
const acceptLanguages = accepts(req);
  const language = acceptLanguages.language(['en', 'fr', 'es']); // Pass an array of supported languages

  //parse the user-agent header of the requrest
  const agent = userAgent.parse(req.headers['user-agent']);
  const software = agent.toString();
  res.json({ ipaddress: ipaddress, "language": language, software: software });
  console.log(ipaddress);
  console.log(language);
  console.log(software);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
