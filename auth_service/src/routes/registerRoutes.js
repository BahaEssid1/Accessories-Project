// const express = require('express');
// const { register } = require('../controllers/registerController');
// const { body } = require('express-validator');
// const router = express.Router();

// // Route d'inscription
// router.post(
//     '/register',
//     [
//         // Validation des champs
//         body('username').notEmpty().withMessage('Username is required'),
//         body('email').isEmail().withMessage('Invalid email format'),
//         body('phone')
//             .isLength({ min: 8, max: 8 })
//             .withMessage('Phone number must be exactly 8 digits')
//             .isNumeric()
//             .withMessage('Phone number must contain only numbers'),
//         body('password')
//             .isLength({ min: 3 })
//             .withMessage('Password must be at least 3 characters long')
//             .matches(/\d/)
//             .withMessage('Password must contain at least one number')
//             .matches(/[!@#$%^&*(),.?":{}|<>]/)
//             .withMessage('Password must contain at least one special character'),
//     ],
//     register
// );


// module.exports = router;







const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user"); // Assuming your User model is at this location
const router = express.Router();

router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("phone")
      .isLength({ min: 8, max: 8 })
      .withMessage("Phone number must be exactly 8 digits")
      .isNumeric()
      .withMessage("Phone number must contain only numbers"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()); // Log validation errors
      return res.status(400).json({ errors: errors.array() }); // Return all validation errors
    }

    const { username, email, phone, password } = req.body;

    try {
      console.log("Registering user:", { username, email, phone, password });

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ errors: [{ msg: "Email is already in use" }] });
      }

      const user = new User({ username, email, phone, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).json({ errors: [{ msg: err.message }] });
    }
  }
);

  

module.exports = router;





