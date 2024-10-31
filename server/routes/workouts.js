/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import { User } from '../db/index.js'  // must be imported for database connection
import axios from 'axios';             // must be imported for external requests
import dotenv from 'dotenv';
import verify from '../security/verify.js';
dotenv.config();

const workouts = express.Router();
// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                                  REQUEST HANDLERS
 * -----------------------------------------------------------------------------------
 *  GET     /                         => enables the user to switch to workouts list
 *  GET     /search                   => enables the user to switch to search workouts
 *  GET     /search/:query            => performs external GET requests
 *  PUT     /create                   => enables user to add a workout to account
 *  PUT     /delete                   => enables user to remove workout from account
 * ----------------------------------------------------------------------------------- */

workouts.get('/', verify, (req, res) => {
  res.status(200).send({view: 'Workouts'});
})

workouts.get('/search', verify, (req, res) => {
  res.status(200).send({view: 'Workouts-Search'})
})

workouts.get('/search/:query', verify, (req, res) => {
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

workouts.patch('/create', verify, (req, res) => {
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

workouts.patch('/delete', verify, (req, res) => {
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
// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default workouts;