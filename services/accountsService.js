const Account = require('../data/accountsEntity');
const Transaction = require('../data/transactionsEntity');
const { errorMessage, successMessage } = require('../utils/responseMessages');

exports.getOneAccount = async (req, res) => {
  try {
    const user = await req.user;

    const account = await Account.findOne({
      user_id: user.id,
      _id: req.params.id,
    }).exec();

    if (!account) {
      return res.status(404).json({
        status: errorMessage,
        message: "Account with given id doesn't exist",
      });
    }

    return res.status(200).json({
      status: successMessage,
      data: account,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const user = await req.user;
    const existingAccount = await Account.findOne({
      user_id: user.id,
      title: req.body.title,
    }).exec();

    if (existingAccount) {
      return res.status(409).json({
        status: errorMessage,
        message: 'Account with given title already exists',
      });
    }
    const newAccount = new Account({
      user_id: user.id,
      ...req.body,
    });

    await newAccount.save();
    res.status(201).json({
      status: successMessage,
      data: newAccount,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const user = await req.user;
    const updatedAccount = await Account.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: user.id,
      },
      { ...req.body },

      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({
        status: errorMessage,
        data: {
          message: 'requested account was not found',
        },
      });
    }
    return res.status(200).json({
      status: successMessage,
      data: updatedAccount,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = await req.user;
    const deletedAccount = await Account.findOneAndDelete({
      _id: req.params.id,
      user_id: user.id,
    });
    if (!deletedAccount) {
      return res.status(404).json({
        status: errorMessage,
        data: {
          message: 'requested account was not found',
        },
      });
    }
    await Transaction.deleteMany({ account_id: req.params.id });

    return res.status(200).json({
      status: successMessage,
      data: {
        message: 'deleted successfully',
      },
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};
exports.getUsersAccounts = async (req, res) => {
  try {
    const user = await req.user;
    const result = await Account.find({ user_id: user.id }).exec();
    res.status(200).json({ status: successMessage, data: result });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};
