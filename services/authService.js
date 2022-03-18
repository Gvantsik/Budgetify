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

const User = require('../data/usersEntity');
const { successMessage, errorMessage } = require('../utils/responseMessages');

exports.register = async (req, res) => {
  try {
    const existingEmail = await findUserByEmail(req.body.email);

    if (existingEmail) {
      res.status(409).json({ message: 'User with this email already exists' });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        countryOfResidence: req.body.countryOfResidence,
        gender: req.body.gender,
      });
      await newUser.save();
      res
        .status(200)
        .json({ status: 'User registered successfully', data: newUser });
    }
  } catch (err) {
    res.status(400).json({ status: errorMessage, data: err.message });
  }
};

exports.login = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    return res.status(401).json({
      status: errorMessage,
      message: 'Please, check email and password and try again',
    });
  }
  const confirmedPassword = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (user.email && confirmedPassword) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,

      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({
      status: successMessage,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        token: `${token}`,
      },
    });
  }
};
