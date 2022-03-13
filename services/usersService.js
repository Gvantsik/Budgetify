const database = require('../data/database');

exports.getAllUsers = (req, res) => {
  res.status(200).json({ status: 'success' });
};
exports.getOneUser = (req, res) => {
  res.status(200).json({ status: 'success' });
};

exports.getUsersTransactions = (req, res) => {
  res.status(200).json({ status: 'success' });
};

exports.getUsersAccounts = (req, res) => {
  res.status(200).json({ status: 'success' });
};
// eslint-disable-next-line arrow-body-style
exports.findUserByEmail = (email) => {
  return database.users.find((user) => user.email === email);
};
