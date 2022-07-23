const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search/:movie", async (req, res, next) => {
  const movieName = req.params.movie;
  const movies = await axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "a2bf4d20efeb5bd42b43106545181c00",
      query: "the titanic",
    },
  });
  //console.log(movies.data);
  res.status(200).json({
    movie: movies.data.results[0],
  });
});

module.exports = router;
