const { ROLES } = require('../utils/constants');

/**
 * Check if user has required role
 * @param  {...string} allowedRoles - Roles that can access the route
 */
const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${allowedRoles.join(' or ')}`
      });
    }

    next();
  };
};

/**
 * Check if user can access data from their country only (for Managers & Members)
 * Admin can access all countries
 */
const countryCheck = (req, res, next) => {
  // Admin has access to all countries
  if (req.user.role === ROLES.ADMIN) {
    return next();
  }

  // For Manager and Member, attach country filter
  req.countryFilter = { country: req.user.country };
  
  next();
};

module.exports = { roleCheck, countryCheck };