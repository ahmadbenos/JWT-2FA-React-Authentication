//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");
const passport = require("passport");
exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    res.json({ user });
  })(req, res, next);
};
