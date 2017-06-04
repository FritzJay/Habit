'use strict'

//config
var config = require('./config.js');

//dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//create instances
var app = express();
var router = express.Router();

//Set port to env.port or 3000
var port = process.env.API_PORT || config.port;

//db config
mongoose.connect(config.con, function(err) {
  if (err) {
    console.log('err');
  }
});

//Look for json data in the req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Models
var User = require('./models/user')

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
 });

//Serve static files
app.use(express.static('src/server/public'))

//Setup router
router.get('/', function(req, res) {
    res.json({message: 'api initialized'});
});

//Create one api call that returns current users information
//This will include an array of 3 habits
router.route('/users/:userId')
  //Gets users profile and habit info
  .get(function (req, res) {
    User.findOne({ id: req.param.userId }, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    })
  })

//Use router when we call api
app.use('/api', router);

//Start server
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
})
