/* ===================================================================================
 *                                    DOCUMENTATION
 * ----------------------------------------------------------------------------------
 * https://developer.mozilla.org/en-US/docs/Web/API/Location                  REVIEW
 * https://developer.mozilla.org/en-US/docs/Web/API/History/pushState         REVIEW
 * https://reactrouter.com/en/main                                            REVIEW
 * https://mongoosejs.com/docs/connections.html#connection-events
 * https://expressjs.com/
 * https://www.passportjs.org/packages/passport-google-oauth20/
 * ----------------------------------------------------------------------------------- */
// =================================================================================== //


/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { db } from './db/index.js'         // must be imported for database connection
import auth from './security/auth.js';     // must be imported for Passport to function
import dotenv from 'dotenv';
import users from './routes/users.js';     
import verify from './security/verify.js';     
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
 * app.use(..., express.static())     => serves client/dist on server startup, post-auth
 * ----------------------------------------------------------------------------------- */

app.use(session(
  { 
    secret: process.env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }
))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/user', users);
app.use('/homepage', verify, express.static('client/dist'));

// ----------------------------------------------------------------------------------- //
// =================================================================================== //





/* ===================================================================================
 *                          AUTHENTICATION & PROTECTED ROUTES
 * -----------------------------------------------------------------------------------
 *
 *  GET   /                         => the login page and entry point to app
 *  GET   /login-success            => login callback function for passport
 *  GET   /homepage                 => redirect on login success, serves client files
 * ----------------------------------------------------------------------------------- */

app.get('/', passport.authenticate('google', { 
  scope: ['email', 'openid'], 
  prompt: 'select_account consent' 
}));

app.get('/login-success', 
  passport.authenticate('google', {
    successRedirect: '/homepage',
    failureRedirect: '/'
  })
);

app.get('/homepage', verify, (req, res) => {
  res.status(200).redirect('/homepage');
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
