const express = require('express');
const { register, login } = require('../controllers/registerController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();


// Route protégée accessible uniquement par les administrateurs
router.get('/adminlog', authenticate, authorize(['admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin!' });
});




module.exports = router;
