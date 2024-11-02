/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import { User } from '../db/index.js'  // must be imported for database connection
import axios from 'axios';             // must be imported for external requests
import dotenv from 'dotenv';
import verify from '../security/verify.js';
import { Meals } from '../db/index.js';
dotenv.config();

const meals = express.Router();
// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                                  REQUEST HANDLERS
 * -----------------------------------------------------------------------------------
 *  GET     /                         => enables the user to switch to meals view
 *  GET     /all                      => retrieves all meals associated with user
 *  POST    /create                   => enables user to create a new meal
 *  DELETE  /delete                   => enables user to delete a meal
 * ----------------------------------------------------------------------------------- */

meals.get('/', verify, (req, res) => {
  res.status(200).send({view: 'Meal Plans'})
})

meals.get('/all', verify, (req, res) => {

  Meals.find({user_id: req.user._id})
    .then((foundMeals) => {

      if (!foundMeals){
        res.sendStatus(404);
      }

      res.status(200).send(foundMeals);
    })
    .catch((error) => {
      console.error(`GET :: INTERNAL :: request meals for user #${req.user._id}.`)
      res.sendStatus(500);
    })

})

meals.post('/create', verify, (req, res) => {
  let meal = {food_items: ''}
  let routine = {routine_name: ''}

  if (req.body.routine_name){
    routine.routine_name = req.body.routine_name;
  } 
  
  if (req.body.food_items && req.body.food_items.length !== 0){
    meal.food_items = req.body.food_items;
  } else {
    res.sendStatus(204);
    return;
  }

  Meals.create({user_id: req.user._id, food_items: meal.food_items, routine_name: routine.routine_name})
    .then((success) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(`POST :: INTERNAL :: Creating meal for #${req.user._id}.`)
      res.sendStatus(500);
    })
})

meals.delete('/delete/:id', verify, (req, res) => {

  Meals.findByIdAndDelete({_id: req.params.id})
    .then((success) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(`DELETE :: INTERNAL :: Deleting all meals for #${req.user._id}.`)
      res.sendStatus(500);
    })

})
// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default meals;