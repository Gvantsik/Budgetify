/* eslint-disable camelcase */
const { findUserByEmail } = require('../controllers/usersController');

const jwtCallback = (jwt_payload, done) => {
  const user = findUserByEmail(jwt_payload.email);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

module.exports = {
  jwtCallback,
};
