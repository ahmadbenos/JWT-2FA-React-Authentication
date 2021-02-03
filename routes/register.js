const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/register");
//router.route("/").post(registerUser);

//!register user
router.post("/", registerUser);
module.exports = router;
