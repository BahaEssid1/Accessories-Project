const jwt = require('jsonwebtoken');

// Middleware d'authentification
exports.authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    // Extraire le token
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajouter les données utilisateur au `req`
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
};

// Middleware d'autorisation
exports.authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access Forbidden' });
    }
    next();
};
