const { findUserByEmail } = require('../controllers/usersController');

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    this.roles = [roles];
  }
  return [
    (req, res, next) => {
      const user = findUserByEmail(req.user.email);

      if (user && roles.includes(user.userRole)) {
        next();
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    },
  ];
};
module.exports = {
  authorize,
};
