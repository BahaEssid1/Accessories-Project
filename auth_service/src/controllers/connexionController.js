// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Vérifier si l'utilisateur existe
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Vérifier le mot de passe
//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Générer un token JWT
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
//         );

//         res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 role: user.role
//             },
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };





// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the password matches
//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
//         );

//         res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 role: user.role,
//             },
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };






// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the password matches
//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
//         );

//         res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 role: user.role,
//             },
//         });
//     } catch (err) {
//         console.error(err);  // Log the error to check what went wrong
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };






// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const loginUser = async (req, res) => {
//   try {
//     console.log("🟢 Login attempt:", req.body);

//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.log("❌ User not found:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("❌ Incorrect password for:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     console.log("✅ Login successful for:", user.email);
//     console.log("🔑 JWT Token:", token); // Display token

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("❌ Error in login:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { loginUser };




const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Import jsonwebtoken
const User = require('../models/user');  // Assuming you have a User model

// Secret key for JWT (This should be stored securely in your environment variables)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      JWT_SECRET_KEY,                      // Secret key
      { expiresIn: '1h' }                 // Expiry time (1 hour)
    );

    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).send({ message: "Error during login" });
  }
}

module.exports = { loginUser };

