const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.updateProfile = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir du token JWT
        const userId = req.user.id;

        // Vérifier les erreurs de validation (si des validations sont ajoutées)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, phone, password } = req.body;

        // Préparer l'objet de mise à jour
        const updateFields = { username, email, phone };

        // Si un mot de passe est fourni, le hacher avant de l'enregistrer
        if (password) {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        // Mettre à jour les champs autorisés
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true, runValidators: true } // `new: true` retourne l'utilisateur mis à jour
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                phone: updatedUser.phone,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
