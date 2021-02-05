const User = require("../Models/User");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // check for password and email validation input
  if (!password || !email) {
    return res
      .status(400)
      .json({ msg: "Invalid email/password input!", status: "error" });
  }
  // Check if user already exists
  const checkedUser = await User.findOne({ email });
  if (checkedUser !== null) {
    return res
      .status(400)
      .json({ msg: "User already exists!", status: "error" });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return console.log(err);
      //? create a new user instance
      const newUser = new User({
        id: uuid(),
        email,
        password: hash,
      });
      //? save the user to database
      try {
        await newUser.save();
        res
          .status(200)
          .json({ msg: "Success registeration", status: "success" });
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Failure Registeration", status: "error" });
      }
    });
  });
};
