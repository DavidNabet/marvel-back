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

router.post("/favorites", async (req, res) => {
  const fav = req.fields.fav;
  let favTab = [[], []];
  try {
    for (let i = 0; i < fav.length; i++) {
      if (i === 0) {
        for (let j = 0; j < fav[i].length; j++) {
          const response = await axios.get(
            `${REACTEUR_URI_PATHNAME}/character/${fav[i][j]}?apiKey=${MARVEL_API_KEY}`
          );
          favTab[0].push(response.data);
        }
      } else {
        for (let j = 0; j < fav[i].length; j++) {
          const response = await axios.get(`
            ${REACTEUR_URI_PATHNAME}/comic/${fav[i][j]}?apiKey=${MARVEL_API_KEY}
          `);

          favTab[1].push(response.data);
        }
      }
    }
    res.json(favTab);
  } catch (err) {
    console.log("error in favorites", err.response.data);
    res
      .status(400)
      .json({ message: err.message, error: err.response.data.message });
  }
});

module.exports = router;
