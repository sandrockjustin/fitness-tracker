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

// ----------------------------------------------------------------------------------- //
// =================================================================================== //

function isLoggedIn(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    User.findById({_id: req.user._id})
      .then((isFound) => {
        if (!isFound) { 
          console.error(`SERVER :: INTERNAL :: User #${req.user._id} does not exist.`);
          res.redirect('/')
        }
        next();
      })
      .catch((error) => {
        console.error('SERVER :: INTERNAL :: Failure to authenticate.');
      })
  }
}

const users = express.Router();

users.post('/logout', (req, res, next) => {
  req.logout( (err) => {
    if (err){
      console.error('POST :: INTERNAL :: Error on logout.')
      return next(err);
    }
    res.sendStatus(200);  // indicate success in logout
  });
})

users.get('/dashboard', isLoggedIn, (req, res) => {
  res.status(200).send({view: 'Dashboard'});
})

users.get('/workouts', isLoggedIn, (req, res) => {
  res.status(200).send({view: 'Workouts'});
})

users.get('/workouts/search', isLoggedIn, (req, res) => {
  res.status(200).send({view: 'Workouts-Search'})
})

users.get('/nutrition', isLoggedIn, (req, res) => {
  res.status(200).send({view: 'Nutrition'})
})

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

users.get('/info/', (req, res) => {
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

users.delete('/delete', (req, res) => {

  const filter = {_id: req.user._id};   

  User.findByIdAndDelete(filter)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(`DELETE :: INTERNAL :: Delete user #${req.user._id}.`)
      res.sendStatus(500);
    })

})


users.get('/workouts/search/:query', (req, res) => {
  const { query } = req.params;
  let data;

  const primaryExternalRequest = `https://api.api-ninjas.com/v1/exercises?muscle=${query}&X-Api-Key=${process.env.API_NINJA_KEY}`;

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

users.patch('/workouts/create', (req, res) => {
  const { workout } = req.body;
        User.findOneAndUpdate(
    {_id: req.user._id},
    {$push: {workouts: workout}},
    { new: true, upsert: true }
  )
  .then((updatedUser) => {
    if (updatedUser) {
      res.status(201).send(updatedUser);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error(`PATCH :: INTERNAL :: New workout for #${req.user._id}.`)
    res.sendStatus(500);
  })
})


users.patch('/workouts/delete', (req, res) => {
  const { workout } = req.body;

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

users.get('/nutrition/search/:query', (req, res) => {

  const { query } = req.params;
  const primaryExternalRequest = `https://api.spoonacular.com/food/ingredients/search?query=${ query }&number=1&sortDirection=desc&apiKey=${process.env.FOOD_API_KEY}`;

  axios.get(primaryExternalRequest)
    .then((foodItem) => {
      let id = foodItem.data.results[0].id
      const secondaryExternalRequest = `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${process.env.FOOD_API_KEY}&amount=1`

      axios.get((secondaryExternalRequest))
        .then((caloricInfo) => {
          //calculates caloric density of the searched food
          let calories = caloricInfo.data.nutrition.nutrients
            .filter(nutrient=>nutrient.name === "Calories")
            .map(key=>key.amount);
            
          let grams = caloricInfo.data.nutrition.weightPerServing.amount
          let nutDensity = calories/grams

          const nutrientsInfo = {
            'foodName': foodItem.data.results[0].name,
            'foodId':  foodItem.data.results[0].id,
            'calories': calories,
            'grams': grams,
            'nutDensity': nutDensity,
            'category': caloricInfo.data.categoryPath[0]
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

users.put('/nutrition/create', (req, res)=>{

	const update = req.body.nutrition; 

	User.findByIdAndUpdate({_id: req.user._id}, {$push: {nutrition: update}})
		.then((updateComplete) => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.error(`PUT :: INTERNAL :: New food item for #${req.user._id}.`)
		})

})

users.put('/nutrition/delete', (req, res)=>{

  User.findByIdAndUpdate({_id: req.user._id}, {$pull: {nutrition: {foodId: req.body.foodData}}})
    .then((data)=>{
      if (!data){ res.sendStatus(404)}
      res.sendStatus(200);
    })
    .catch((err)=>{
      console.error(`PUT :: INTERNAL :: On delete food #${req.body.foodData} for user #${req.user._id}.`)
      res.sendStatus(500);
    })
})

// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default users;