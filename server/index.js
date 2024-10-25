import express from 'express';            // Importing Express to use for our server
import { User, db } from './db/index.js'  // Importing User model and the database (db) connection

const app = express();              // create Express instance named 'app'
const port = 8080;                  // random port, can change as necessary

//////////////////////////////////////////////////////////////////////////////////////
/*                                 MIDDLEWARE                                       */

//app.use(...)                      // create router middlewares
//app.use(...)
//app.use(...)
//app.use(...)

//app.use(...)                      // apply google passport as auth middleware
app.use(express.json())             // use express.json() as middleware
app.use('/', express.static('client/dist'));  // on startup, serve files from webpack
//////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////
/*                                  REQUEST HANDLERS                                */

/* 
  Undeveloped, but this will be for a more sensitive request (login) that is necessary
  for authentication. I want to try to keep these separate so that we aren't unnecessarily
  exposing a user's password or, even worse, somehow exposing the secret given to use by
  Google Passport.
*/
app.get('/user', (req, res) => {
})

// Responsible for answering basic get request, return the current User's information from database
app.get('/user/info/:id', (req, res) => {

  // Try to find a user matching the current user's ID
  User.find({_id: req.params.id})
    .then((foundUser) => {

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