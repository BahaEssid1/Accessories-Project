const { validationResult } = require('express-validator');
const User = require('../models/user');

// Contrôleur pour qu'un client supprime son profil
exports.deleteProfile = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur connecté
        const userId = req.user.id;

        // Supprimer l'utilisateur
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};