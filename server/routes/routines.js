/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import { Routine } from '../db/index.js'     // must be imported for database connection
import dotenv from 'dotenv';
import verify from '../security/verify.js';
dotenv.config();

const routines = express.Router();
 
// ----------------------------------------------------------------------------------- //
// =================================================================================== //

routines.delete('/delete', verify, (req, res) => {

  const filter = {_id: req.user._id};   

  Routine.findByIdAndDelete(filter)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(`DELETE :: INTERNAL :: Delete user #${req.user._id}.`)
      res.sendStatus(500);
    })

})
.get()
// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default routines;