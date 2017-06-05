'use strict'

//dependencies
var express = require('express');
var bodyParser = require('body-parser');

//create instances
var app = express();
var router = express.Router();

//Set port to env.port or 3001
var port = process.env.API_PORT || 3001;

//Look for json data in the req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Models
var User = require('./models/models');
var Habit = require('./models/Habit');

// Postgres connection
const pool = require('./lib/db');

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
app.use(express.static('server/public'))

//Setup router
router.get('/', function(req, res) {
    res.json({message: 'api initialized'});
});

// Returns relevant users information
router.route('/users/:userID')
  //Gets users profile and habit info
  .get(function (req, res) {
      // Gets users info from postgres
      pool.query('SELECT * FROM users WHERE user_id=$1', [req.params.userID], function(error, result) {
        if (error)
          return console.error('Error running query. ', error);
        // Create a user using the user model
        var user = new User(result.rows[0]);
        console.log(user)
        res.json(user);
      })
    })
  .post(function (req, res) {
    console.log(req.json());
    // Saved users info to postgres db
  })

// Returns habits connected to user
router.route('/habits/:userID')
  .get(function (req, res) {
    pool.query('SELECT * FROM habits LEFT JOIN users_habits ON habits.habit_id=users_habits.habit_id WHERE user_id=$1', [req.params.userID], function(error, result) {
      if (error)
        return console.error('Error running query: ', error);
      var habits = [];
      for (var i = 0; i < result.rows.length; i++) {
        habits.push(new Habit(result.rows[i]));
      }
      console.log(habits)
      res.json(habits);
    })
  })

//Use router when we call api
app.use('/api', router);

//Start server
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
})
