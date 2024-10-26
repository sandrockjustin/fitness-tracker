import express from 'express';            // Importing Express to use for our server
import session from 'express-session';
import passport from 'passport';
import { User, db } from './db/index.js'  // Importing User model and the database (db) connection
import auth from './auth.js';
import axios from 'axios';

const app = express();              // create Express instance named 'app'
const port = 8080;                  // random port, can change as necessary

//////////////////////////////////////////////////////////////////////////////////////
/*                                 MIDDLEWARE                                       */

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

app.use(session(
  { 
    secret: 'kdjJHS98DY0812SsadKangar00',
    resave: false,
    saveUninitialized: false
  }
)) // this should eventually be stored in an .env
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())                       // use express.json() as middleware
app.use('/', express.static('client/dist'));  // on startup, serve files from webpack
//////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////
/*                                  REQUEST HANDLERS                                */

// previous issue resolved; issue was how we were using passport.authenticate in route
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'openid'] }));

app.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/currentWorkouts',
    failureRedirect: '/auth/google'
  })
);


// when user clicks nav button to change view, is GET request that can be protected
app.get('/currentWorkouts', (req, res) => {

  res.status(200).redirect('/');

})

app.get('/searchWorkouts', (req, res) => {
  
})

app.get('/nutrition', (req, res) => {
  
})

// On request to logout, attempt to delete session and user data
app.post('/logout', (req, res, next) => {

  // handles deletion of req.user
  req.logout( (err) => {
    if (err) { return next(err)}

    // this is deleting session but a new one is being created by middleware
    // either way, this isn't fixing the issue of being able to login AGAIN after logout
    req.session.destroy( (err) => {
      if (err) { return next(err)}
      res.status(200).redirect('/auth/google');
    })
  });
})

// Responsible for answering basic get request, return the current User's information from database
app.get('/user/info/:username', (req, res) => {

  console.log('req.params', req.params);
  // Try to find a user matching the current user's ID
  User.findOne({username: req.params.username})
    .then((foundUser) => {
      console.log('foundUser', foundUser);
      // if no user with that ID is found
      if (foundUser === null){
        res.sendStatus(404)
      }

      // Why scrub user? Ensures sensitive information (password, salt, secret) are not leaked
      const scrubUser = {
        _id: foundUser._id,
        username: foundUser.username,
        workouts: foundUser.workouts,
        nutrition: foundUser.nutrition
      }

      // After user is scrubbed of sensitive info, deliver to client
      res.status(200).send(scrubUser)
    })
    .catch((error) => {
      console.error(`Error on GET request for /workouts.`)
      res.sendStatus(500);
    })
})

/* 
  This is used to update ANY property for a user, this includes updates to workouts and nutrition...
  
  Patch request MUST include current client-side property that we are changing, this ensures that we
  are adding to that array instead of totally replacing it.

  Ex. req.data = {'workouts': [...this.state.user.workouts, newWorkout]}

  If we don't do this, then the 'workouts' property will be completely overwritten by a workout
*/
app.put('user/info/:id', (req, res) => {

  const filter = {_id: req.params.id};  // filter will be applied to the wildcard :id specified by Axios

  const update = req.data;              // might be body rather than data, must double-check

  User.findByIdAndUpdate(filter, update)  // attempt to find a user and update
    .then((complete) => {
      res.sendStatus(201);                // when completed, a 201 is sent
    })
    .catch((error) => {
      console.error(`Error on post request to ${req.params.id}...`);
      res.sendStatus(500);
    })
})

/* 
  This is used to send a search request to API Ninjas
  endpoint '/WorkoutSearch/workouts
*/
app.get('/WorkoutSearch/workouts/:query', (req, res) => {
  const {query} = req.params;
  let data;
  // https://api.api-ninjas.com/v1/exercises?muscle={searchQuery}
  axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${query}&X-Api-Key=${API_NINJA_KEY}`)
    .then((response) => {
      data = JSON.stringify(response.data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error('Error during API fetch for workouts', err);

      res.sendStatus(500);
    })

})
//////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////
/*                  DATABASE CONNECTION & SERVER LISTENER                           */
// On successful connection to database, have our server begin listening for requests...
db.on('open', () => {
  app.listen( port, () => {
    console.log(`>> Connection to database fitness-tracker established <<`)
    console.log(`Express is listening on port ${port}...`)
  })
})

db.on('disconnected', () => {
  console.log('>> Disconnected from database fitness-tracker <<')
})

db.on('disconnecting', () => {
  console.log('>> Disconnecting to database fitness-tracker <<')
})

db.on('reconnected', () => {
  console.log('>> Attempting reconnect to database fitness-tracker <<')
})

db.on('close', () => {
  console.log('>> Connection to database fitness-tracker has been closed <<')
})
/////////////////////////////////////////////////////////////////////////////////////