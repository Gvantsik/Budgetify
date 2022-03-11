exports.getAllCategories = (req, res) => {
  res.status(200).json({ status: 'success' });
};

exports.getOneCategory = (req, res) => {
  res.status(200).json({ status: 'success' });
};

exports.createCategory = (req, res) => {
  res.status(200).json({ status: 'success' });
};

exports.updateCategory = (req, res) => {
  res.status(202).json({
    status: 'success',
    data: {
      message: 'requested category updated successfully',
    },
  });
};
exports.deleteCategory = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'deleted successfully',
    },
  });
};
