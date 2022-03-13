require('dotenv').config();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { findUserByEmail } = require('./usersService');
const { jwtCallback } = require('../auth/passport');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(options, jwtCallback));
const database = require('../data/database');

exports.register = (req, res) => {
  const existingEmail = findUserByEmail(req.body.email);
  if (existingEmail) {
    res.status(401).json({ message: 'User with this email already exists' });
  } else {
    database.users.push({
      id: database.users.length + 1,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role,
    });

    res.status(200).json({ message: 'User registered successfully' });
  }
};

exports.login = (req, res) => {
  const user = findUserByEmail(req.body.email);
  const confirmedPassword = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (user.email && confirmedPassword) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.userRole,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,

      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.userRole,
      token: `Bearer ${token}`,
    });
  } else {
    res
      .status(401)
      .json({ message: 'Please, check email and password and try again' });
  }
};
