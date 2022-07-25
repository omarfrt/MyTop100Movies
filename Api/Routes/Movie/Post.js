const express = require("express");
const router = express.Router();
const axios = require("axios");
const Movie = require('../../Models/movie');
const { default: mongoose } = require("mongoose");
const { deleteOne } = require("../../Models/movie");



//needs mongoose and db
router.post("/", async (req, res, next) => {
  const movieName = req.query.movieName;
  const movies = await axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "a2bf4d20efeb5bd42b43106545181c00",
      query: movieName,
    },
  },
  ).catch((err) => {
    res.status(500).json({
      error: err,
    })
  });
  const SearchResult = movies.data.results[0];
  const movie = new Movie({
      _id: new mongoose.Types.ObjectId(),
  adult: SearchResult.adult,
  backdrop_path: SearchResult.backdrop_path,
  budget: SearchResult.budget,
  genres:SearchResult.genres,
  id: SearchResult.id,
  imdb_id: SearchResult.imdb_id,
  original_language: SearchResult.original_language,
  original_title: SearchResult.original_title,
  overview: SearchResult.overview,
  popularity: SearchResult.popularity,
  production_companies:SearchResult.production_companies,
  release_date:SearchResult.release_date,
  revenue: SearchResult.revenue,
  runtime: SearchResult.runtime,
  spoken_languages: SearchResult.spoken_languages,
  status: SearchResult.status,
  tagline: SearchResult.tagline,
  title: SearchResult.title,
  video: SearchResult.video,
  vote_average: SearchResult.vote_average,
  vote_count: SearchResult.vote_count,
  });
  movie.save()
  .then((result) => {
    res.status(201).json({
      message: "movie created",
      createdMovie: result,
    });
  })
  .catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
  

});

module.exports = router;

