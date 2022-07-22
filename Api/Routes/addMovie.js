const express = require('express');
const router = express.Router();

router.get('/search/:movie',(req,res,next)=>{
    const movieName = req.params.movie;
    res.status(200).json({
        name:movieName
    })
});

module.exports= router;