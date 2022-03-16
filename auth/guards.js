const { findUserByEmail } = require('../services/usersService');

const authorize = async (req, res, next) => {
  const loggedUser = await req.user;
  const user = await findUserByEmail(loggedUser.email);

  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  authorize,
};
