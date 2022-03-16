const Account = require('../data/accountsEntity');

const successMessage = 'success';
const errorMessage = 'error';

async function checkRelation(userId, accountId) {
  const result = await Account.findOne({
    user_id: userId,
    _id: accountId,
  }).exec();
  return result;
}
exports.getOneAccount = async (req, res) => {
  try {
    const user = await req.user;

    const ownsAccount = await checkRelation(user.id, req.params.id);

    if (!ownsAccount) {
      return res.status(404).json({
        status: errorMessage,
        message: "Account with given id doesn't exist",
      });
    }
    const result = await Account.findById(req.params.id);

    res.status(200).json({
      status: successMessage,
      data: result,
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
    const ownsAccount = await checkRelation(user.id, req.params.id);
    if (!ownsAccount) {
      return res.status(409).json({
        status: errorMessage,
        message: 'User does not belong requested account',
      });
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
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
    const ownsAccount = await checkRelation(user.id, req.params.id);
    if (!ownsAccount) {
      return res.status(409).json({
        status: errorMessage,
        message: 'User does not belong requested account',
      });
    }
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: successMessage,
      data: {
        message: 'deleted successfully',
      },
    });
  } catch (err) {
    return res.status(400).json({ status: 'erros', message: err.message });
  }
};
exports.getUsersAccounts = async (req, res) => {
  try {
    const user = await req.user;
    const result = await Account.find().where('user_id').equals(user.id).exec();
    res.status(200).json({ status: successMessage, data: result });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};
