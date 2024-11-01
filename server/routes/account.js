/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import { User } from '../db/index.js'  // must be imported for database connection
import dotenv from 'dotenv';
import verify from '../security/verify.js';

const account = express.Router();
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

account.get('/', verify, (req, res) => {
  res.status(200).send({view: 'Account Page'})
})

account.patch('/username', verify, (req, res) => {

  const user = {_id: req.user._id}
  const update = {username: req.body.data};
  
  User.findByIdAndUpdate(user, update)
    .then((userUpdated) => {
      if (userUpdated instanceof Error){
        res.sendStatus(404);
      }

      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
    })

})

account.patch('/phone', verify, (req, res) => {

  const user = {_id: req.user._id}
  const update = {phone_num: req.body.data};
  
  User.findByIdAndUpdate(user, update)
    .then((userUpdated) => {
      if (userUpdated instanceof Error){
        res.sendStatus(404);
      }

      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
    })

})

account.patch('/email', verify, (req, res) => {

  const user = {_id: req.user._id}
  const update = {recov_email: req.body.data};
  
  User.findByIdAndUpdate(user, update)
    .then((userUpdated) => {
      if (userUpdated instanceof Error){
        res.sendStatus(404);
      }

      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
    })

})

// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default account;