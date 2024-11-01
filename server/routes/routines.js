/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import { Routines } from '../db/index.js'  // must be imported for database connection
import axios from 'axios';             // must be imported for external requests
import dotenv from 'dotenv';
import verify from '../security/verify.js';
dotenv.config();

const routines = express.Router();
// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                                  REQUEST HANDLERS
 * -----------------------------------------------------------------------------------
 *  POST    /create           => enables user to create a new routine
 *  GET     /                 => enables the user to switch to Routines view
 *  GET     /all              => enables a fetch for all routines for the user
 *  PATCH   /update/:id       => updates routine with specified ID
 *  DELETE  /delete/:id       => deletes routine with specified ID
 * ----------------------------------------------------------------------------------- */

routines.post('/create', verify, (req, res) => {

  Routines.create(
    {
      user_id: req.user._id,
      routine_name: req.body.routine_name,
      exercises: req.body.exercises
    }
  )
  .then((newRoutine) => {
    if (newRoutine) {
      res.status(201).send(newRoutine);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error(`POST :: INTERNAL :: New routine '${req.body.routine_name}' for user #${req.user._id}.`)
    res.sendStatus(500);
  })
})

routines.get('/', verify, (req, res) => {
  res.status(200).send({view: 'Routines'});
})

routines.get('/all', verify, (req, res) => {
  Routines.find({user_id: req.user._id})
    .then((foundRoutines) => {
      if (!foundRoutines){
        res.sendStatus(404);
      }

      res.status(200).send(foundRoutines);
    })
    .catch((err) => {
      console.error(`GET :: INTERNAL :: Error on fetching routines for user #${req.user._id}`)
      res.sendStatus(500);
    })
})

routines.patch('/update/:id', verify, (req, res) => {

  Routines.findOneAndUpdate(
    {_id: req.params.id},
    {routine_name: req.body.name}
  )
  .then((updatedRoutine) => {
    if (updatedRoutine) {
      res.status(201).send(updatedRoutine);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error(`PATCH :: INTERNAL :: Update routine #${req.params.id} for #${req.user._id}.`)
    res.sendStatus(500);
  })
})

routines.delete('/delete/:id', verify, (req, res) => {
  Routines.findOneAndDelete({_id: req.params.id})
    .then((isComplete) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(`SERVER :: INTERNAL :: Deleting routine #${req.params.id}`);
      res.sendStatus(500);
    })

});

// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default routines;