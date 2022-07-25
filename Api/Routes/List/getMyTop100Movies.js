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

router.get("/",checkAuth,(req,res,next)=>{

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,pwdjwt);
     const usrId = decoded.userId;

    User.find({_id:usrId})
    .sort({'rank':1})
    .exec()
    .then(SearchResult =>{
        const response={
          Movies: SearchResult.map(SearchResult=>{

                    return{
                        top100movies:SearchResult.top100movies
                        
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
        
    
})
module.exports= router;