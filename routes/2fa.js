const express = require("express");
const router = express.Router();
const speakeasy = require("speakeasy");
const User = require("../Models/User");

router.get("/activate", (req, res) => {
  try {
    const newSecret = speakeasy.generateSecret();
    res.json({ tempSecret: newSecret.base32, status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});

router.post("/verify", (req, res) => {
  const { secret, token, userId } = req.body;
  try {
    const isVerified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });
    if (isVerified) {
      User.findOneAndUpdate(
        { id: userId },
        { secret },
        {
          new: true,
        }
      )
        .then((data) => {
          res.json({ verified: true, status: "success" });
        })
        .catch((err) => console.log(err));
    } else {
      res.json({ verified: false, status: "error" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/validate", (req, res) => {
  const { secret, token } = req.body;
  try {
    const isValidated = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });
    if (isValidated) {
      res.json({ verified: true, status: "success" });
    } else {
      res.json({ verified: false, status: "error" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
