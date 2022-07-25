const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const movie = require("./movie");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  UserName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  top100movies:[{ 
    _id: false,
    adult: Boolean,
    backdrop_path: String,
    budget: Number,
    id: {type: Number, unique: true },
    imdb_id: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    release_date: String,
    revenue: Number,
    runtime: Number,
    status: String,
    tagline: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number,
    rank:{ type: Number,unique : true, min: 18, max: 65 , } }]
});
userSchema.plugin(timestamps);

module.exports = mongoose.model("user", userSchema);
