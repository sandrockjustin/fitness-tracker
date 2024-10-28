/* Following Passport instructions provided here: https://www.passportjs.org/packages/passport-google-oauth20/ */
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { User } from './db/index.js'; // importing model for interactions
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ _id: profile.id }, function (err, user) {
      return cb(err, { _id: user._id }); // reworked, now should only store the user's ID, which we can use in requests
    });
  }
));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

export default passport;