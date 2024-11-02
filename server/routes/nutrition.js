/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import { User } from '../db/index.js'  // must be imported for database connection
import axios from 'axios';             // must be imported for external requests
import dotenv from 'dotenv';
import verify from '../security/verify.js';
import { Meals } from '../db/index.js';
import meals from './meals.js';
dotenv.config();

const nutrition = express.Router();
// ----------------------------------------------------------------------------------- //
// =================================================================================== //




/* ===================================================================================
*                                    MIDDLEWARE
* -----------------------------------------------------------------------------------
* nutrition.use('/workouts', workouts)     => handles requests for '/user/workouts/::'
* ----------------------------------------------------------------------------------- */
nutrition.use('/meals', meals);
// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                                  REQUEST HANDLERS
 * -----------------------------------------------------------------------------------
 *  GET     /                         => enables the user to switch to nutrition view
 *  GET     /search/:query            => performs two external GET requests to API
 *  PUT     /create                   => enables user to add an item to pantry
 *  PUT     /delete                   => enables user to remove item from pantry
 * ----------------------------------------------------------------------------------- */

nutrition.get('/', verify, (req, res) => {
  res.status(200).send({view: 'Nutrition'})
})

nutrition.get('/search/:query', verify, (req, res) => {

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

nutrition.put('/create', verify, (req, res)=> {

	const update = req.body.nutrition; 

	User.findByIdAndUpdate({_id: req.user._id}, {$push: {nutrition: update}})
		.then((updateComplete) => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.error(`PUT :: INTERNAL :: New food item for #${req.user._id}.`)
		})

})

nutrition.put('/delete', verify, (req, res)=>{

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

export default nutrition;