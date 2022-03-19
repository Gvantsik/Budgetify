const Category = require('../data/categoriesEntity');
const Transaction = require('../data/transactionsEntity');
const { errorMessage, successMessage } = require('../utils/responseMessages');

exports.getAllCategories = async (req, res) => {
  try {
    const { user } = req;
    const result = await Category.find()
      .where('user_id')
      .equals(user.id)
      .exec();
    res.status(200).json({ status: successMessage, data: result });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};

exports.getOneCategory = async (req, res) => {
  try {
    const { user } = req;

    const category = await Category.findOne({
      user_id: user.id,
      _id: req.params.id,
    }).exec();

    if (!category) {
      return res.status(404).json({
        status: errorMessage,
        message: "Category with given id doesn't exist",
      });
    }
    const result = await Category.findById(req.params.id);

    res.status(200).json({
      status: successMessage,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { user } = req;
    const existingCategory = await Category.findOne({
      user_id: user.id,
      title: req.body.title,
      type: req.body.type,
    });

    if (existingCategory) {
      return res.status(409).json({
        status: errorMessage,
        message: 'Category with given title and type already exists',
      });
    }
    const newCategory = new Category({
      user_id: user.id,
      ...req.body,
    });

    await newCategory.save();
    res.status(201).json({
      status: successMessage,
      data: newCategory,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { user } = req;
    const updatedCategory = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: user.id,
      },
      { ...req.body },

      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({
        status: errorMessage,
        data: {
          message: 'requested account was not found',
        },
      });
    }
    return res.status(200).json({
      status: successMessage,
      data: updatedCategory,
    });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { user } = req;
    const findCategoryInTransactions = await Transaction.find({
      user_id: user.id,
      category_id: req.params.id,
    });
    if (findCategoryInTransactions) {
      return res.status(400).json({
        status: errorMessage,
        message:
          'You have transaction in this category and can not be deleted. Please, change the category details instead',
      });
    }
    const deletedCategory = await Category.findOneAndDelete({
      _id: req.params.id,
      user_id: user.id,
    });
    if (!deletedCategory) {
      return res.status(404).json({
        status: errorMessage,
        data: {
          message: 'requested category was not found',
        },
      });
    }
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
