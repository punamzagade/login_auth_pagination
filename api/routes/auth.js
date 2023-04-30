
// const express = require("express");
// const router = express.Router();
// const User = require("../model/User");
// const CJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
// const { Cookies } = require('universal-cookie-express');

// router.post("/login", async (req, res) => {
//   try {
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (!existingUser) {
//       res.status(404).send("User does not exist");
//     } else {
//       const existingUserPassword = CJS.AES.decrypt(
//         existingUser.password,
//         process.env.CRY
//       );
//       const originalPassword = existingUserPassword.toString(CJS.enc.Utf8);

//       if (originalPassword !== req.body.password) {
//         res.status(401).send("Wrong credentials!");
//       } else {
//         const accessToken = jwt.sign(
//           {
//             id: existingUser._id,
//           },
//           process.env.JWT
//         );
//         const { password, ...others } = existingUser._doc;

//         const cookies = new Cookies(req);
//         cookies.set('zaperon', accessToken, {
//           maxAge: 24 * 60 * 60 * 1000,
//           httpOnly: true,
//         });

//         res.status(200).send({ ...others, accessToken });
//       }
//     }
//   } catch (err) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// module.exports = router;




const router = require("express").Router();
const User = require("../model/User");
const CJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  try {
    if (existingUser) {
      res.status(409).json("Email already exists");
    } else {
      const newUser = new User({
        ...req.body,
        password: CJS.AES.encrypt(
          req.body.password,
          process.env.CRY
        ).toString(),
      });
      const saveNewUser = await newUser.save();
      res.status(200).json(saveNewUser);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if(!existingUser){
        res.status(404).send("User does not exists");
    }else{
        const existingUserPassword = CJS.AES.decrypt(
            existingUser.password,
            process.env.CRY
          );
          const originalPassword = existingUserPassword.toString(CJS.enc.Utf8);
      
          originalPassword !== req.body.password &&
            res.status(401).send("Wrong credentials!");
      
          const accessToken = jwt.sign(
            {
              id: existingUser._id,
            },
            process.env.JWT
          );
          const { password, ...others } = existingUser._doc;
         
          res
            .cookie("zaperon", accessToken, {
             maxAge:24 * 60 * 60 * 1000,
              httpOnly: false,
              secure: true,
              path:"/"
            })
            res.status(200)
            .send({ ...others, accessToken });
        
    }
   

   
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
