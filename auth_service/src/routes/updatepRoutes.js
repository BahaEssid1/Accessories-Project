const express = require("express");
const { body } = require("express-validator");
const {
  updateProfile,
} = require("../controllers/updatepController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route de mise à jour du profil (clients uniquement)
router.put(
  "/updateP",
  authenticate, // Authentifie l'utilisateur via JWT
  authorize(["client"]), // Vérifie que le rôle est "client"
  [
    body("username").optional().notEmpty().withMessage("Username cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("phone")
      .optional()
      .isLength({ min: 8, max: 8 })
      .withMessage("Phone number must be exactly 8 digits")
      .isNumeric()
      .withMessage("Phone number must contain only numbers"),
    body("password")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],
  updateProfile // Contrôleur pour mettre à jour le profil
);

module.exports = router;
