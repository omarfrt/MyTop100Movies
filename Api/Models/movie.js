const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  adult: Boolean,
  backdrop_path: String,
  belongs_to_collection: { type: { preference1: Object }, default: null },
  budget: Number,
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  homepage: String,
  id: Number,
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: { type: { preference1: String }, default: null },
  production_companies: [
    {
      id: Number,
      logo_path: String,
      name: String,
      origin_country: String,
    },
  ],
  production_countries: [
    {
      iso_3166_1: String,
      name: String,
    },
  ],
  release_date: String,
  revenue: Number,
  runtime: Number,
  spoken_languages: [
    {
      iso_639_1: String,
      name: String,
    },
  ],
  status: String,
  tagline: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
});

productSchema.plugin(timestamps);

module.exports = mongoose.model("movie", movieSchema);
