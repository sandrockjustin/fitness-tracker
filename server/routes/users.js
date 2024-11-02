/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import { User, Routines, Meals } from '../db/index.js'
import dotenv from 'dotenv';
import workouts from './workouts.js';               // workouts router
import nutrition from './nutrition.js';             // nutrition router
import routines from './routines.js';
import account from './account.js';
import verify from '../security/verify.js';

dotenv.config();
const users = express.Router();

// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
*                                    MIDDLEWARE
* -----------------------------------------------------------------------------------
* app.use('/workouts', workouts)     => handles requests for '/user/workouts/::'
* app.use('/nutrition', nutrition)   => handles requests for '/user/nutrition/::'
* app.use('/routines', routines)     => handles requests for '/user/routines/::'
* app.use('/account', account)       => handles requests for '/user/account/::'
* ----------------------------------------------------------------------------------- */
users.use('/workouts', workouts);
users.use('/nutrition', nutrition);
users.use('/routines', routines);
users.use('/account', account);
// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                                  REQUEST HANDLERS
 * -----------------------------------------------------------------------------------
 *  GET     /info                   => CRITICAL :: supplies data to top-level component
 *                                   > other components cannot render if unsuccessful
 *                                   > additionally enables all 'read' functionality
 *
 *  GET     /dashboard              => enables the user to switch to dashboard
 *  POST    /logout                 => enables the user to logout
 *  DELETE  /delete                 => deletes the user account
 * ----------------------------------------------------------------------------------- */

users.post('/logout', (req, res, next) => {
  req.logout( (err) => {
    if (err){
      console.error('POST :: INTERNAL :: Error on logout.')
      return next(err);
    }
    res.sendStatus(200);  // indicate success in logout
  });
})

users.get('/dashboard', verify, (req, res) => {
  res.status(200).send({view: 'Dashboard'});
})

users.get('/info/', verify, (req, res) => {
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

users.delete('/delete', verify, (req, res) => {

  const filter = {_id: req.user._id};   

  User.findByIdAndDelete(filter)
    .then(() => {
      return Routines.deleteMany({user_id: req.user._id})
    })
    .then(() => {
      return Meals.deleteMany({user_id: req.user._id})
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(`DELETE :: INTERNAL :: Delete user #${req.user._id}.`)
      res.sendStatus(500);
    })

})

// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default users;