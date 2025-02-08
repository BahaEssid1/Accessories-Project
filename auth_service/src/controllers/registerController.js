// const User = require('../models/user');
// const { validationResult } = require('express-validator');
// exports.register = async (req, res) => {
//     try {
//         // Vérifier les erreurs de validation
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { username, email, phone, password } = req.body;

//         // Créer un nouvel utilisateur
//         const user = new User({ username, email, phone, password });
//         await user.save();

//         res.status(201).json({ message: 'User registered successfully', user });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


// const User = require("../models/user");
// const { validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");

// const register = async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { username, email, phone, password } = req.body;
//         const normalizedEmail = email.toLowerCase();

//         const existingUser = await User.findOne({ email: normalizedEmail });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             username,
//             email: normalizedEmail,
//             phone,
//             password: hashedPassword,
//         });

//         await newUser.save();

//         return res.status(201).json({
//             message: "User registered successfully",
//             user: {
//                 id: newUser._id,
//                 username: newUser.username,
//                 email: newUser.email,
//                 phone: newUser.phone,
//             },
//         });
//     } catch (err) {
//         console.error("❌ Error in registration:", err);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };


// module.exports = { register };
 



// const bcrypt = require("bcryptjs");
// const User = require("../models/user");

// const registerUser = async (req, res) => {
//   try {
//     console.log("🟢 Registering user:", req.body);

//     const { username, email, phone, password } = req.body;

//     // Check if email already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const user = new User({
//       username,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     await user.save();

//     console.log("✅ User registered:", user);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("❌ Error in registration:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { registerUser };





const bcrypt = require('bcrypt');
const User = require('../models/user');

async function registerUser(req, res) {
  const { username, email, phone, password } = req.body;

  // Hash the password before saving to the database
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error registering user" });
  }
}
