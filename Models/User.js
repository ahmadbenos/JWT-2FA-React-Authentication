const mongoose = require("mongoose");

const User = new mongoose.Schema({
  id: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  secret: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", User);
