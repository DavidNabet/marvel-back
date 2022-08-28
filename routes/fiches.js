const router = require("express").Router();
const axios = require("axios");

const { MARVEL_API_KEY, REACTEUR_URI_PATHNAME } = process.env;

router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `${REACTEUR_URI_PATHNAME}/comics/?apiKey=${MARVEL_API_KEY}`,
      {
        params: {
          title: req.query.title,
          limit: req.query.limit || 100,
          skip: req.query.skip || 0,
        },
      }
    );

    res.status(200).json(response.data);

    // res.json("Hello");
  } catch (error) {
    console.log(error.response.data);
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${REACTEUR_URI_PATHNAME}/comics/${req.params.characterId}?apiKey=${MARVEL_API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response.data);
    res.status(400).json({ message: err.message });
  }
});

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `${REACTEUR_URI_PATHNAME}/characters?apiKey=${MARVEL_API_KEY}`,
      {
        params: {
          name: req.query.name,
          limit: req.query.limit || 100,
          skip: req.query.skip || 0,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
