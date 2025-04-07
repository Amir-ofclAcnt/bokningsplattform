const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('🚫 Ingen token hittades i Authorization-header');
    return res.status(401).json({ message: 'Ingen token tillhandahållen' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id || !decoded.role) {
      console.warn('🚫 Token saknar nödvändig data:', decoded);
      return res.status(401).json({ message: 'Ogiltig eller inkomplett token' });
    }

    req.user = decoded; // { id, role, ... }
    next();
  } catch (err) {
    console.error('❌ Tokenverifiering misslyckades:', err.message);
    res.status(401).json({ message: 'Ogiltig token' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    console.warn(`🚫 Åtkomst nekad – användarroll: ${req.user?.role}`);
    return res.status(403).json({ message: 'Endast admin har åtkomst' });
  }
  next();
};
