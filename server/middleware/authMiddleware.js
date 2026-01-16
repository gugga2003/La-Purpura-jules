const jwt = require('jsonwebtoken');

const authMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Añade el payload del token a la petición

      // Si se especifican roles, verificar que el usuario tenga uno de ellos
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Acceso prohibido. No tienes los permisos necesarios.' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
  };
};

module.exports = authMiddleware;
