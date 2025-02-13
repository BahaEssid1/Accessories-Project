const express = require('express');
const {  login } = require('../controllers/connexionController');

const router = express.Router();



// Route de connexion
router.post('/login', login);

module.exports = router;




