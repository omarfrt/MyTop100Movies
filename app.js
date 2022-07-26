
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const checkAuth = require('./Api/middelware/passport');
const userRoutes = require("./Api/Routes/User/User");
const PostmovieRoutes = require("./Api/Routes/Movie/Post");
const GetmovieRoutes = require("./Api/Routes/Movie/Get");
const DeletemovieRoutes= require("./Api/Routes/Movie/Delete");
const ListAddMovieRoutes = require("./Api/Routes/List/AddMovie");
const ListDeleteMovieRoutes= require("./Api/Routes/List/RemoveMovie");
const  ListGetMyTop100MoviesRoutes = require("./Api/Routes/List/GetMyTop100Movies");
//leaving everything here to make coding faster
mongoose.connect(
  //mongodb address
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
//cors handelling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origins,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/Movie",PostmovieRoutes,GetmovieRoutes,DeletemovieRoutes);
app.use("/User", userRoutes);
app.use("/MyTop100Movie",ListAddMovieRoutes,ListDeleteMovieRoutes,ListGetMyTop100MoviesRoutes);
//handling errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
