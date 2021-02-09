const jwt = require("jsonwebtoken");

const passport = require("passport");
exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message, status: "error" });
    }
    jwt.sign(
      { id: user.id, email: user.email, two_fa_Validated: false },
      "secret",
      { expiresIn: "60s" },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.json({
            message: "An error has occured",
            status: "error",
          });
        }
        res.json({ message: user, status: "success", token });
      }
    );
  })(req, res, next);
};
