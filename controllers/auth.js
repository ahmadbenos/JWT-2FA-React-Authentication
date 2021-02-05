const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        //Check if user exists!
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "User doesn't exist!" });
            }
            // Match the password
            bcrypt.compare(password, user.password, (err, matched) => {
              if (err) {
                console.log(err);
              }
              if (matched) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Wrong password!" });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );
};
