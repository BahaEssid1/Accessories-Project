const { validationResult } = require('express-validator');
const User = require('../models/user');

// Contrôleur pour qu'un admin modifie son propre profil
exports.updateAdminProfile = async (req, res) => {
    try {
        // Récupérer l'ID de l'administrateur connecté
        const adminId = req.user.id;

        // Vérifier les erreurs de validation (si des validations sont ajoutées)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, phone } = req.body;

        // Mettre à jour les informations de l'admin
        const updatedAdmin = await User.findByIdAndUpdate(
            adminId,
            { username, email, phone },
            { new: true, runValidators: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({
            message: 'Admin profile updated successfully',
            user: {
                id: updatedAdmin._id,
                username: updatedAdmin.username,
                email: updatedAdmin.email,
                phone: updatedAdmin.phone,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
