const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  favorites: {
    characters: Array,
    comics: Array,
  },
  hash: String,
  token: String,
  salt: String,
});

module.exports = User;
