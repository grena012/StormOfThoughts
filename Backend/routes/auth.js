const express = require("express");
const User = require("../Models/Users");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../controller/fetchallusers');

const JWT_SECRET = 'WhatIbelieveinit';

//ROUTE 1: create a user using : POST "\api/auth/create " No login required
router.post('/createuser', [
   body('name', 'Enter a Valid Name').isLength({ min: 4 }),
   body('username', 'Enter a Valid username').isLength({ min: 4 }),
   body('password', ' Password must contains atleast 8 latters').isLength({ min: 8 }),
   // body('confirm_password').custom((value, {req}) => { colsole.log(value)})
], async (req, res) => {
   let success = false;
   //If there are errors return Bad request and errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
   }
   //check whether the password and confirm password is not same
   //Check whether the user with this user exists already
   try {
      let user = await User.findOne({ username: req.body.username });
      if (user) {
         return res.status(400).json({ success, error: "Sorry user with this username is already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
         name: req.body.name,
         username: req.body.username,
         password: securePassword,
      })

      const data = {
         user: {
            id: user.id
         },
      };
      
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      success = true;
      res.json({success, authtoken })

      //Catch errors
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required

router.post('/login', [
    body('username', 'Enter a valid username').exists(),
    body('password', 'password cannot be blank').exists(),
 ], async (req, res) => {
    let success = false;
 
   //If there are errors return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
 
    const { username, password } = req.body;
    try {
       let user = await User.findOne({ username });
       if (!user) {
          success = false;
          return res.status(400).json({ success, error: "Please try to login with correct credentials" });
       }
 
       const passwordCompare = await bcrypt.compare(password, user.password);
       if (!passwordCompare) {
          success = false;
          return res.status(400).json({ success,  error: "Please try to login with correct credentials" });
       }
 
       const data = {
          user: {
             id: user.id
          },
       };
 
       const authtoken = jwt.sign(data, JWT_SECRET);
       success = true;
       res.json({ success, authtoken })
 
    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal Server Error");
    }
 
 });

 // ROUTE 3: Get loggedin User Details Using: POST "/api/auth/getuser" Login required

router.post('/getuser', fetchuser, async (req, res) => {


    try {
       userId = req.user.id;
       const user = await User.findById(userId).select("-password")
       res.send(user)
       console.log(user.username);

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal Server Error");
    }
 })
 module.exports = router;
 
 