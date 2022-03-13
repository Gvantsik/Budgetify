/* eslint-disable no-restricted-syntax */
const database = require('../data/database');

exports.getOneAccount = (req, res) => {
  const accountId = Number(req.params.id);
  for (const account of database.accounts) {
    if (account.id === accountId) {
      res.status(200).json({
        status: 'success',
        data: account,
      });
      return;
    }
  }

  res.status(404).json({
    status: 'error',
    message: "Account with given id doesn't exist",
  });
};

exports.createAccount = (req, res) => {
  for (const account of database.accounts) {
    if (account.name === req.body.name) {
      res.status(409).json({
        status: 'error',
        message: 'Account with given name already exists',
      });
    }
  }
  const newAccount = {
    id: database.accounts.length + 1,
    ...req.body,
  };

  database.accounts.push(newAccount);

  res.status(200).json({
    status: 'success',
    data: newAccount,
  });
};

exports.updateAccount = (req, res) => {
  const accountId = Number(req.params.id);
  let index = 0;

  for (let account of database.accounts) {
    if (account.id === accountId) {
      account = {
        ...account,
        ...req.body,
      };
      database.accounts[index] = account;

      res.status(202).json({
        status: 'success',
        data: {
          message: 'requested account changed successfully',
        },
      });
      return;
    }
    index += 1;
  }

  res.status(404).json({
    status: 'error',
    data: {
      message: 'requested item was not found',
    },
  });
};
exports.deleteAccount = (req, res) => {
  for (let i = 0; i < database.accounts.length; i += 1) {
    if (database.accounts[i].id === Number(req.params.id)) {
      database.accounts.splice(i, 1);
      res.status(200).json({
        status: 'success',
        data: {
          message: 'deleted successfully',
        },
      });
      return;
    }
  }
  res.status(404).json({
    status: 'error',
    data: {
      message: 'Could not delete account with this id',
    },
  });
};
