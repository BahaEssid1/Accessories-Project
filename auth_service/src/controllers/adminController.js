const User = require("../models/user");

// Récupérer tous les clients
exports.getAllClients = async (req, res) => {
    try {
        const clients = await User.find({ role: "client" }, "-password"); // Exclure les mots de passe
        res.status(200).json({ clients });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un client par ID
exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await User.findByIdAndDelete(id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({ message: "Client deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Rechercher un client par email ou username
exports.searchClient = async (req, res) => {
    try {
        const { email, username } = req.query;

        const query = {};
        if (email) query.email = email;
        if (username) query.username = username;

        const client = await User.findOne(query, "-password");
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({ client });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
