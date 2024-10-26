/* Following Passport instructions provided here: https://www.passportjs.org/packages/passport-google-oauth20/ */
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { User } from './db/index.js'; // importing model for interactions
import dotenv from 'dotenv';

dotenv.config();

// we need to import GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET from .env file
// we do this because we don't want this information leaked, which would compromise security
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback", // will likely change for us
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

export default passport;