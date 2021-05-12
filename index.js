const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

mongoose.connect(process.env.MONGO_LOCAL_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(formidable());
app.use(cors());

app.use("/user", require("./routes/user"));

app.get("/", (req, res) => {
  res.json("Welcome to Marvel API !");
});

app.all("*", (req, res) => {
  res.status(400).json({ error: "Cette route n'existe pas !" });
});

app.listen(process.env.PORT || 3200, () => {
  console.log("Server proccess 🎉");
});
