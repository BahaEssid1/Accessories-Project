const express = require("express");
const { getAllClients, deleteClient, searchClient } = require("../controllers/adminController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route pour obtenir tous les clients
router.get("/clients", authenticate, authorize(["admin"]), getAllClients);

// Route pour supprimer un client par ID
router.delete("/clients/:id", authenticate, authorize(["admin"]), deleteClient);

// Route pour rechercher un client par email ou username
router.get("/clients/search", authenticate, authorize(["admin"]), searchClient);

module.exports = router;
