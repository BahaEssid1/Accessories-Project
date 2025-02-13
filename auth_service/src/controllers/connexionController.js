
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.matchPassword(password); // Assuming `matchPassword` method is set up on the User model
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token and user info
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username, // Include username here
        phone: user.phone,
    },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Register user (unchanged, assuming it's correct)
exports.register = async (req, res) => {
  const { username, phone, email, password } = req.body;

  try {
    const user = new User({
      username,
      phone,
      email,
      password,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





