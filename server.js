const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//! connect to databse
const { connectMongo } = require("./controllers/connect_db");
connectMongo();

app.get("/api", (req, res) => {
  res.json({ msg: "test" });
});

app.use("/api/register", require("./routes/register"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
