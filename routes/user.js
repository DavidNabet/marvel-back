const express = require("express");
const User = require("../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.fields;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      // Si l'email existe
      res.status(409).json({ error: "This email is already exists" });
    } else {
      const userUsername = await User.findOne({
        account: { username: username },
      });
      if (userUsername) {
        // Si le username existe
        return res.status(400).json({ error: "This username is already used" });
      } else {
        // Tous les champs doivent être renseignés
        if (email && password && username) {
          // Récupère une image par défaut pour l'avatar
          const avatar =
            "https://res.cloudinary.com/dkigh7ogm/image/upload/v1620310993/vinted/avatar-default_fj5qrk.png" ||
            null;
          // Génère un salt
          const salt = uid2(16);
          // Génère un hash
          const hashPassword = SHA256(salt + password).toString(encBase64);
          // Génère un token (la string est aléatoire)
          const token = uid2(64);
          // Déclaration des favoris
          const favorites = {
            characters: [],
            comics: [],
          };

          const newUser = new User({
            email,
            token,
            account: {
              username,
              avatar: avatar,
            },
            favorites,
            hash: hashPassword,
            salt,
          });

          await newUser.save();
          res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            token: newUser.token,
            account: newUser.account,
            favorites: newUser.favorites,
          });
        } else {
          res.status(400).json({ error: "Missing parameters" });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.fields;
    if (email && password) {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "This email does not an account !" });
      } else {
        const newHash = SHA256(user.salt + password).toString(encBase64);
        if (user.hash === newHash) {
          res.status(200).json({
            _id: user._id,
            token: user.token,
            account: {
              username: user.account.username,
            },
            favorites: user.favorites,
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
