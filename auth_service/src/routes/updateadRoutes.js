const express = require('express');
const {  updateAdminProfile } = require('../controllers/updateadController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();


// Route pour qu'un admin puisse modifier son propre profil
router.put(
    '/updatead',
    authenticate, // Authentifie l'utilisateur
    authorize(['admin']), // Vérifie que l'utilisateur a le rôle "admin"
    updateAdminProfile // Contrôleur pour modifier le profil admin
);

module.exports = router;
