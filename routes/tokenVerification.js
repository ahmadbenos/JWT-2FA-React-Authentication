const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const bearer = req.headers["authorization"];
  if (bearer !== undefined) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, "secret", (err, authInfo) => {
      if (err) {
        console.log(err);
        return res.json({
          message: "You are not logged in! Login to view resource",
          status: "error",
        });
      }
      console.log(authInfo);
      res.json({ message: authInfo, status: "success" });
    });
  } else {
    res.json({
      message: "You are not logged in! Login to view resource",
      status: "error",
    });
  }
});

module.exports = router;
