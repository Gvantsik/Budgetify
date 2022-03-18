const { errorMessage, successMessage } = require('./accountsService');
const Category = require('../data/categoriesEntity');
const Transaction = require('../data/transactionsEntity');
const Account = require('../data/accountsEntity');

exports.getOneTransaction = async (req, res) => {
  try {
    const user = await req.user;

    const transaction = await Transaction.findOne({
      user_id: user.id,
      _id: req.params.id,
    }).exec();

    if (!transaction) {
      return res.status(404).json({
        status: errorMessage,
        message: "Transaction with given id doesn't exist",
      });
    }

    return res.status(200).json({
      status: successMessage,
      data: transaction,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    let { title, description, amount, category_id, type, account_id } =
      req.body;
    // checks for correct data transfer
    if (type === 'expense') {
      amount = -Math.abs(amount);
    } else {
      amount = Math.abs(amount);
    }

    // checks whether user belongs the account, on which user wanna make transaction
    const user = await req.user;
    const account = await Account.findOne({
      user_id: user.id,
      _id: account_id,
    }).exec();

    if (!account) {
      return res.status(409).json({
        status: errorMessage,
        message: 'Account with given id does not exist',
      });
    }
    // checks whether user has the category with given id and if not, creates new category

    if (category_id) {
      const getCategory = await Category.findById(category_id);

      if (!getCategory) {
        return res.status(404).json({
          status: errorMessage,
          message: 'Category with given id does not exist',
        });
      }
    } else {
      // check if category_id is not given, but category with given title and type already exists
      const existingCategory = await Category.findOne({
        user_id: user.id,
        title: req.body.category_title,
        type,
      });

      if (!existingCategory) {
        const newCategory = new Category({
          user_id: user.id,
          title: req.body.category_title,
          type,
        });
        await newCategory.save();
      }
    }

    const category = await Category.findOne(
      { title: req.body.category_title, type },
      'id'
    ).exec();

    // if type is expense, checks whether user has enough positive amount
    if (type === 'expense') {
      if (account.balance === 0 || account.balance < Math.abs(amount)) {
        return res.status(400).json({
          status: errorMessage,
          message: 'There is not enough amount for spending',
        });
      }
    }
    // if all validations pass successfully, new transaction adds in db
    const newTransaction = new Transaction({
      user_id: user.id,
      type,
      title,
      description,
      account_id,
      category_id: category_id ? category_id : category.id,
      amount,
    });

    await newTransaction.save();

    // account's balance is updating with current transaction's amount
    await Account.findByIdAndUpdate(
      account_id,
      { balance: (account.balance += amount) },
      { new: true }
    );
    res.status(201).json({
      status: successMessage,
      data: newTransaction,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const user = await req.user;
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user_id: user.id,
    });

    const account = await Account.findById(transaction.account_id);

    /* when user updates transaction's amount,
checks whether updated expense amount will not turn account's balance negative  */
    if (transaction.type === 'expense' && req.body.amount) {
      req.body.amount = -Math.abs(req.body.amount);
      const accBalance = account.balance - transaction.amount + req.body.amount;

      if (accBalance < 0) {
        return res.status(409).json({
          status: errorMessage,
          data: {
            message:
              'Could not update transacation with given amount as it exceeds current balance',
          },
        });
      }
    }
    if (transaction.type === 'income' && req.body.amount) {
      req.body.amount = Math.abs(req.body.amount);
    }
    const updatedTransaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: user.id,
      },
      { ...req.body },

      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({
        status: errorMessage,
        data: {
          message: 'requested transaction was not found',
        },
      });
    }

    await Account.findOneAndUpdate(
      { id: updatedTransaction.account_id, user_id: user.id },
      { balance: account.balance - transaction.amount + req.body.amount },
      { new: true }
    );

    return res.status(200).json({
      status: successMessage,
      data: updatedTransaction,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};
exports.deleteTransaction = async (req, res) => {
  try {
    const user = await req.user;
    const transaction = await Transaction.findById(req.params.id);

    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user_id: user.id,
    });
    if (!deletedTransaction) {
      return res.status(404).json({
        status: errorMessage,
        data: {
          message: 'requested account was not found',
        },
      });
    }
    // updates account balance after deleted transaction
    const account = await Account.findById(transaction.account_id);
    await Account.findOneAndUpdate(
      { id: transaction.account_id, user_id: user.id },
      { balance: account.balance - transaction.amount },
      { new: true }
    );
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
exports.getUsersTransactions = async (req, res) => {
  try {
    const user = await req.user;
    const account = await Account.findOne({
      _id: req.params.id,
      user_id: user.id,
    });
    if (!account) {
      return res.status(404).json({
        status: errorMessage,
        message: "Account with given id doesn't exist",
      });
    }
    const { searchBy, category, sort, page, limit } = req.query;

    const query = Transaction.find({
      user_id: user.id,
      account_id: req.params.id,
    });
    if (category) {
      query.populate({ path: 'category_id', match: { title: category } });
    }

    if (searchBy) {
      query.find(searchBy);
    }
    if (sort) {
      query.sort(sort);
    } else {
      query.sort({ createdAt: -1 });
    }

    if (limit) {
      const limitNumber = Number(limit);
      const pageNumber = page ? Number(page) - 1 : 0;
      query.limit(limitNumber);
      query.skip(limitNumber * pageNumber);
    } else {
      query.limit(10);
    }
    let result = await query;
    result = result.filter((element) => element.category_id !== null);

    res.status(200).json({ status: successMessage, data: result });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};
