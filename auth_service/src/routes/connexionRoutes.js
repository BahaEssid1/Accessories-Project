// const express = require('express');
// const {  login } = require('../controllers/connexionController');

// const router = express.Router();



// // Route de connexion
// router.post('/login', login);

// module.exports = router;

const express = require('express');
const { loginUser } = require('../controllers/connexionController');  // Import the login function

const router = express.Router();

// Route to handle login
router.post('/login', loginUser);

module.exports = router;



