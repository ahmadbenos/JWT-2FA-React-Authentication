const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

//! connect to databse
const { connectMongo } = require("./controllers/connect_db");
connectMongo();

require("./controllers/auth")(passport);

app.get("/api", (req, res) => {
  res.json({ msg: "test" });
});

app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
