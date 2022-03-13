exports.getOneTransaction = (req, res) => {
  res.status(200).json({ status: 'success' });
};

exports.createTransaction = (req, res) => {
  res.status(200).json({ status: 'success' });
};

exports.updateTransaction = (req, res) => {
  res.status(202).json({
    status: 'success',
    data: {
      message: 'requested transaction updated successfully',
    },
  });
};
exports.deleteTransaction = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'deleted successfully',
    },
  });
};
