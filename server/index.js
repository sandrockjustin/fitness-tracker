/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';            
import session from 'express-session';
import passport from 'passport';
import { User, db } from './db/index.js'  // must be imported for database connection  
import auth from './auth.js';             // must be imported for Passport to function
import axios from 'axios';                // must be imported for external requests
import dotenv from 'dotenv';
dotenv.config();

const app = express();              // create Express instance named 'app'
const port = 8080;                  // random port, can change as necessary
// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                                    MIDDLEWARE
 * -----------------------------------------------------------------------------------
 * 
 * app.use(session())                 => Express is used for creating sessions
 * app.use(passport.initialize())     => initializes Passport for incoming requests
 * app.use(passport.session())        => works on top of Express session middleware
 * app.use(express.json())            => helps with parsing requests
 * app.use(..., express.static())     => serves client/dist on server startup
 * ----------------------------------------------------------------------------------- */

function isLoggedIn(req, res, next) {
  // req.user ? next() : res.sendStatus(401);
  
}

app.use(session(
  { 
    secret: process.env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }
))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())                       
app.use('/', express.static('client/dist'));
// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                          AUTHENTICATION & PROTECTED ROUTES
 * -----------------------------------------------------------------------------------
 *
 * /auth/google               => used for login and authentication
 * /google/callback           => used after authentication to determine where to go next
 * /logout                    => deletes session, cookies and changes view to login
 * 
 * /currentWorkouts           => used to change view to 'WorkoutList' component
 * /searchWorkouts            => used to change view to 'WorkoutSearch' component
 * /nutrition                 => used to change view to 'Nutrition' component
 * ----------------------------------------------------------------------------------- */

app.get('/auth/google', passport.authenticate('google', { 
  scope: ['email', 'openid'], 
  prompt: 'select_account' 
}));

app.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/currentWorkouts',
    failureRedirect: '/auth/google'
  })
);

// On request to logout, attempt to delete session and user data
app.post('/user/logout', (req, res, next) => {
  req.logout( (err) => {
    if (err) { return next(err)}
    req.session.destroy((err) => {
      if (err) { return next(err)}
      res.clearCookie('connect.sid')
      res.status(200).redirect('/auth/google');
    })
  });
})

app.get('/user/workouts', (req, res) => {
  res.status(200).send({view: 'Workouts'})
})

app.get('/user/workouts/search', (req, res) => {
  res.status(200).send({view: 'Workouts-Search'})
})

app.get('/user/nutrition', (req, res) => {
  res.status(200).send({view: 'Nutrition'})
})
// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                                  REQUEST HANDLERS
 * -----------------------------------------------------------------------------------
 * 
 *  GET    /user/info               => CRITICAL :: supplies data to top-level component
 *                                   > other components cannot render if unsuccessful
 *                                   > additionally enables all 'read' functionality
 *  GET    /user/workouts/search     => external request to API to retrieve workouts
 *  GET    /user/nutrition/search   => external request to API to retrieve food items
 * 
 *  PATCH  /user/workouts/create    => allows for user to save a workout to account
 *  PATCH  /user/workouts/delete    => allows for user to delete a workout from account
 *  PUT    /user/nutrition/create   => allows for user to add items to pantry
 *  PUT    /user/nutrition/delete   => allows for user to delete items from pantry
 * ----------------------------------------------------------------------------------- */

app.get('/user/info/', (req, res) => {
  const filter = {_id: req.user._id};       
  User.findById(filter)  
    .then((user) => {
      if (!user){ res.sendStatus(404)};     
      res.status(200).send(user);           
    })
    .catch((error) => {
      console.error(`GET :: INTERNAL :: Retrieve user #${req.user._id}.`);
      res.sendStatus(500);
    })
})

app.get('/user/workouts/search/:query', (req, res) => {
  const { query } = req.params;
  let data;

  const primaryExternalRequest = `https://api.api-ninjas.com/v1/exercises?muscle=${query}&X-Api-Key=${API_NINJA_KEY}`;

  axios.get(primaryExternalRequest)
    .then((workouts) => {
      data = JSON.stringify(workouts.data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error('GET :: EXTERNAL :: Searching workouts');
      res.sendStatus(500);
    })
})

app.patch('/user/workouts/create', (req, res) => {
  const { workout } = req.body;

  User.findOneAndUpdate(
    {_id: req.user._id},
    {$push: {workouts: workout}},
    { new: true, upsert: true }
  )
  .then((updatedUser) => {
    if (updatedUser) {
      res.status(201).send(updatedUser);  // review main; do we even need to send these?
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error(`PATCH :: INTERNAL :: New workout for #${req.user._id}.`)
    res.sendStatus(500);
  })
})

app.patch('/user/workouts/delete', (req, res) => {
  const { workout } = req.body;

  // console.log('id/workout', workout, id);
  User.findOneAndUpdate(
    {_id: req.user._id},
    {$pull: {workouts: workout}}
  )
  .then((updateComplete) => {
    if(!updateComplete) {
      res.sendStatus(404);
    } else {
      res.sendStatus(201);
    }
  })
  .catch((err) => {
    res.sendStatus(500);
  })
});

app.get('/user/nutrition/search/:query', (req, res) => {

  const { query } = req.params;
  const primaryExternalRequest = `https://api.spoonacular.com/food/ingredients/search?query=${ query }&number=1&sortDirection=desc&apiKey=${FOOD_API_KEY}`;

  axios.get(primaryExternalRequest)
    .then((foodItem) => {
      let id = foodItem.data.results[0].id
      const secondaryExternalRequest = `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${FOOD_API_KEY}&amount=1`

      axios.get((secondaryExternalRequest))
        .then((caloricInfo) => {
          //calculates caloric density of the searched food
          let calories = caloricInfo.data.nutrition.nutrients[2].amount
          let grams = caloricInfo.data.nutrition.weightPerServing.amount
          let nutDensity = calories/grams

          const nutrientsInfo = {
            'foodName': foodItem.data.results[0].name,
            'foodId':  foodItem.data.results[0].id,
            'calories': calories,
            'grams': grams,
            'nutDensity': nutDensity
          }

          res.status(200).send(nutrientsInfo)
        })
        .catch((error) => {
          console.error(`GET :: EXTERNAL :: Searching nutrition :: Secondary external request.`)
          res.sendStatus(500);
        })
    })
    .catch((error) => {
      console.error(`GET :: EXTERNAL :: Searching nutrition :: Primary external request.`)
      res.sendStatus(500);
    })
})

app.put('/user/nutrition/create', (req, res)=>{

	const update = req.body.nutrition; 

	User.findByIdAndUpdate({_id: req.user._id}, {$push: {nutrition: update}})
		.then((updateComplete) => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.error(`PUT :: INTERNAL :: New food item for #${req.user._id}.`)
		})

})

app.put('/user/nutrition/delete', (req, res)=>{

  User.findByIdAndUpdate({_id: req.user._id}, {$pull: {nutrition: {foodId: req.body.foodData}}})
  .then((data)=>{
    // INCOMPLETE
    console.log("THEN BLOCK DATA", data)
  })
  .catch((err)=>{
    console.error(`PUT :: INTERNAL :: On delete food #${req.body.foodData} for user #${req.user._id}.`)
  })
})

// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                                DATABASE LISTENERS
 * -----------------------------------------------------------------------------------
 *  
 *  'open'          =>  CRITICAL :: when database opens, listen for requests from server
 *  'disconnected'  =>  if database cannot be reached or you are disconnected
 *  'disconnecting' =>  if an error emerges and database closes
 *  'reconnected'   =>  if we are able to reconnect to database
 *  'close'         =>  if connection is completely closed
 * ----------------------------------------------------------------------------------- */


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
// ----------------------------------------------------------------------------------- //
// =================================================================================== //