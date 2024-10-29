import express from 'express';            // Importing Express to use for our server
import session from 'express-session';
import Passport from 'passport-google-oauth20';
import { User, db } from './db/index.js'  // Importing User model and the database (db) connection
import axios from 'axios';
import {API_NINJA_KEY, FOOD_API_KEY} from '../config.js';


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

// Responsible for answering basic get request, return the current User's information from database
app.get('/user/info/:username', (req, res) => {

  // console.log('req.params', req.params);
  // Try to find a user matching the current user's ID
  User.findOne({username: req.params.username})
    .then((foundUser) => {
      // console.log('foundUser', foundUser);
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
////////////////////////////////////////////////////////////
//Workout request handlers
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

//handle requests to add workout to users saved workout list
app.patch('/WorkoutSearch/addWorkout', (req, res) => {
  const {workout, user} = req.body;
  // console.log('user', user);
  // console.log('workout to be added', workout);
  User.findOneAndUpdate(
    {_id: user._id},
    {$push: {workouts: workout}},
    { new: true, upsert: true }
  )
  .then((updatedUser) => {
    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error('Failed to find user and add workout')
    res.sendStatus(500);
  })
});

//////////////////////////////////////////////////////////////////////////////////////
//REQUEST HANDLER FOR DELETION OF A WORKOUT FROM USERS SAVED WORKOUT LIST
app.patch('/WorkoutList/deleteWorkout/:id', (req, res) => {
  const {workout} = req.body;
  const id = req.params.id;
  // console.log('id/workout', workout, id);
  User.findOneAndUpdate(
    {_id: id},
    {$pull: {workouts: workout}}
  )
  .then((user) => {
    if(!user) {
      res.sendStatus(404);
    } else {
      res.sendStatus(201);
    }
  })
  .catch((err) => {
    res.sendStatus(500);
  })
});
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////

/* 
  This is used to send a search request to Spoonacular
  endpoint '/FoodSearch
*/
app.get('/FoodSearch/:query', (req, res) => {
  const {query} = req.params;
  // console.log("SERVER REQ PARAMS", req.params)
  
  axios.get(`https://api.spoonacular.com/food/ingredients/search?query=${ query }&number=1&sortDirection=desc&apiKey=${FOOD_API_KEY}`)
  .then(results=>{

    let id = results.data.results[0].id

    console.log("FOODID", id, results.data.results[0])

    

    axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${FOOD_API_KEY}&amount=1`)
    .then((data)=>{

      //calculates caloric density of the searched food
      let calories = data.data.nutrition.nutrients
      .filter(nutrient=>nutrient.name === "Calories")
      .map(key=>key.amount);


      let grams = data.data.nutrition.weightPerServing.amount
      console.log("###### GRAMS:", grams)
      let nutDensity = calories/grams

      console.log("|calories", calories, "|grams", grams, "|caloric density", nutDensity)

      const nutrientsInfo = {
        foodName: results.data.results[0].name,
        foodId:  results.data.results[0].id,
        calories,
        grams,
        nutDensity
      }

      res.status(200).send(nutrientsInfo);

    })
  })
  .catch(err=>{
    console.error("didn't get food", err)
    res.sendStatus(500)
  })

})


/* 
  This is used to save a search result from 
  endpoint '/pantry
*/
app.put('/pantry/:id', (req, res)=>{

	const id = req.params.id;
	const update = req.body.nutrition; // not sure if req.data or req.body
	

  console.log("!!! !!! !!! USER DATA NUTRITION???:", User.findById(id).then(data=>console.log(data)))
	///////////////////////////////////////////////
	console.log(`User ID is: ${id}.`)
	console.log(`Request body is: `, req.body)
	///////////////////////////////////////////////


	User.findByIdAndUpdate({_id: id}, {$push: {nutrition: update}})
		.then((updateComplete) => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.error(`Error on PUT request to pantry for User ${id}.`)
		})

})
//////////////////////////////////////////////////////////////////
/* 
  This is used to delete an entry result from
  endpoint '/pantry
*/

app.put('/pantry/food/:id', (req, res)=>{
  // console.log("DELETE REQ PARAMS", req.body)
  // console.log('user request:', req.params.id)

  User.findByIdAndUpdate({_id: req.params.id}, {$pull: {nutrition: {foodId: req.body.foodData}}})
  .then((data)=>{
    // console.log("THEN BLOCK DATA", data)
  })
  .catch((err)=>{
    console.error(err)
  })


})

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