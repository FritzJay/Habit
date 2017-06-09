'use strict'

//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

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

// Authentication
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
 });

//Setup router
router.get('/', function(req, res) {
    res.json({message: 'api initialized'});
});

// Verifies username and password
// Generates a token and saves all of it
// to the db
router.route('/users')
  .post(function (req, res) {
      let user = req.body.user;
      console.log(user);

      // Generate errors
      let errors = [];
      if (user.password !== user.password_confirmation)
        errors.push("Passwords must be the same.");
      if (user.password.length < 6)
        errors.push("Password must be longer than 6 characters.");
      if (user.username.length < 3)
        errors.push("Username must be 3+ characters.");
      pool.query('SELECT user_id FROM users WHERE username=$1', [user.username], function (error, result) {
        if (error) {
          return console.log(error);
        }
        if (result.rows[0])
        {
          console.log(result.rows[0])
          errors.push("Username is already taken.");
        }
        // If there are any errors send a 300 status with errors
        if (errors.length > 0)
          res.status(302).send(JSON.stringify(errors));
        else {
          // Create a JWT token
          var token = jwt.sign(user.password, 'fritzish');
          // Create a hash
          var hash = bcrypt.hashSync(user.password, 10);

          // Save user info into database
          pool.query('INSERT INTO users (username, picture, token, hash) VALUES ($1, $2, $3, $4);', [user.username, 'profile.jpg', token, hash], function (error, result) {
            if (error)
              return console.error('There was a problem.', error);
            else {
              console.log("Saved user to db");
              // return the info including token as JSON
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              })
            }
          });
        }
      });
    })
    
//Serve static files
app.use(express.static(path.join(__dirname, './public')));

router.route('/authenticate')
  .post(function (req, res) {
      let session = req.body.session;
      console.log(session);

      // Generate errors
      let errors = [];
      if (session.password.length < 6)
        errors.push("Password must be longer than 6 characters.");
      if (session.username.length < 3)
        errors.push("Username must be 3+ characters.");
      pool.query('SELECT hash FROM users WHERE username=$1', [session.username], function (error, result) {
        if (error) {
          return console.log(error);
        }
        if (result.rowCount < 1) {
          errors.push("Username not found.");
          console.log("Username not found");
        } else {
          // Compare the hash stored in the database with the hash created
          // from the password
          let hash = result.rows[0].hash;
          if (bcrypt.compareSync(session.password, hash))
          {
            // Generate a new token
            // Create a JWT token
            var token = jwt.sign(session.password, 'fritzish');
            // Save the new token into the database
            pool.query('UPDATE users SET token=$1 WHERE username=$2', [token, session.username], function (error, result) {
              if (error) {
                return console.error('Something bad happened.', error);
              }
              console.log('Updated the hash in database');
              // return the info including token as JSON
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              })
            })
          } else {
            errors.push("Incorrect password.");
          }
        }
        // If there are any errors send a 300 status with errors
        if (errors.length > 0)
          res.status(302).send(JSON.stringify(errors));
      });
  })

// Route middleware to verify a token
router.use(function(req, res, next) {
  // Check for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  // Decode the token
  if (token) {
    // Verify secret and check exp
    jwt.verify(token, 'fritzish', function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // Save to request for use in the other routes
        req.decoded = decoded;
        next();
      }
    }); 
  } else {
    // Return error if there is no token
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

// Returns relevant users information
router.route('/users/:token')
  //Gets users profile and habit info
  .get(function (req, res) {
      // Gets users info from postgres
      pool.query('SELECT * FROM users WHERE token=$1', [req.params.token], function(error, result) {
        if (error)
          return console.error('Error running query. ', error);
        // Create a user using the user model
        var user = new User(result.rows[0]);
        console.log(user)
        res.json(user);
      })
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
