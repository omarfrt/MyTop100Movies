const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const axios = require("axios");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const checkAuth = require('../../middelware/passport');
const Movie = require('../../Models/movie');
const User = require('../../Models/user');

const pwdjwt= '3ezi3endo2dh' //simple auth 


router.post("/", checkAuth, async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,pwdjwt);
     const usrId = decoded.userId;

const movieName = req.body.movieName;
const rank = req.body.rank;
  const movies = await axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "a2bf4d20efeb5bd42b43106545181c00",
      query: movieName,
    },
  });
  const SearchResult = movies.data.results[0];



  const movie = {
   
adult: SearchResult.adult,
backdrop_path: SearchResult.backdrop_path,
budget: SearchResult.budget,
id: SearchResult.id,
imdb_id: SearchResult.imdb_id,
original_language: SearchResult.original_language,
original_title: SearchResult.original_title,
overview: SearchResult.overview,
popularity: SearchResult.popularity,
release_date:SearchResult.release_date,
revenue: SearchResult.revenue,
runtime: SearchResult.runtime,
status: SearchResult.status,
tagline: SearchResult.tagline,
title: SearchResult.title,
video: SearchResult.video,
vote_average: SearchResult.vote_average,
vote_count: SearchResult.vote_count,
rank:rank
};
//$addToSet only pushes values that don't already exists in top100movies array
//for some reason i doesn't return err
User.updateOne({_id:usrId},{$addToSet:{top100movies:movie}}).exec().then((result) => {
    res.status(200).json({
      message: "movie added to your top 100 movie",
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
})

module.exports= router;