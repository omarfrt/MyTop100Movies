const express = require("express");
const router = express.Router();
const Movie =require("./../../Models/movie")

router.delete("/",  (req, res, next) => {
    const id = req.query._id;
    Movie.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "Movie deleted"
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
module.exports= router;