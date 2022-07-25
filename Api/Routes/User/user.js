const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('./../../Models/user');
const checkAuth = require('./../../middelware/passport');
// leaving pwdjwt here for now
const pwdjwt= '3ezi3endo2dh';

router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                UserName:req.body.UserName,
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then(result => {
                  
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                 console.log(err);
                 
                  res.status(500).json({
                    error: err
                    
                  });
                });
            }
          });
        }
      });
  });
  
  router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                userId: user[0]._id,
                fUserName: user[0].UserName,
                email: user[0].email,
              },
               pwdjwt,
              {
                  expiresIn: "24h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
       
        res.status(500).json({
          error: err
        });
      });
  });
  

module.exports= router;