const express = require("express");
const { deleteProfile } = require("../controllers/deletepController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route pour qu'un client puisse supprimer son profil
router.delete(
  "/deleteP",
  authenticate, // Authentifie l'utilisateur
  authorize(["client"]), // Vérifie que l'utilisateur a le rôle "client"
  deleteProfile // Contrôleur pour supprimer le profil
);
module.exports = router;