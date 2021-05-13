const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, unique: true, required: true },
  account: {
    username: {
      type: String,
      required: true,
    },
    avatar: Object,
  },
  favorites: {
    characters: Array,
    comics: Array,
  },
  hash: String,
  token: String,
  salt: String,
});

module.exports = User;
