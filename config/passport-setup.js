const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./key");
const User = require("../models/user-model");
const cookieSession = require('cookie-session');

//User of db
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user exists
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("this email is already register");
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
