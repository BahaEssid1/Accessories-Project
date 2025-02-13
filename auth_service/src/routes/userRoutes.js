const express = require('express');
const User = require('../models/user'); // User model
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware'); 


// Get user info
router.get('/user', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); 
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
