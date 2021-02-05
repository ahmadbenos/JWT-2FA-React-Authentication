const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/login");
const passport = require("passport");

router.post("/", loginUser);

module.exports = router;
