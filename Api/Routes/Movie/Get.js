const express = require("express");
const router = express.Router();
const Movie = require('../../Models/movie');

router.get('/',(req,res,next)=>{
  Movie.find()
  .sort({ 'createdAt':-1})
  .exec()
  .then(SearchResult =>{
  const response={
   count:SearchResult.length,
    Movies: SearchResult.map(SearchResult=>{
      return{
        _id: SearchResult._id,
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
       
      }
    })
  };

    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

  module.exports= router;

