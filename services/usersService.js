const User = require('../data/usersEntity');
const successMessage = 'success';
const errorMessage = 'error';

exports.getAllUsers = async (req, res) => {
  try {
    const result = (await User.find()).map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
    const numberOfUsers = result.length;
    res
      .status(200)
      .json({ status: successMessage, data: { total: numberOfUsers, result } });
  } catch (err) {
    return res.status(400).json({ status: errorMessage, message: err.message });
  }
};
exports.getOneUser = async (req, res) => {
  try {
    const user = await req.user;

    if (user && user.id === req.params.id) {
      const result = await User.findById(user.id);
      res.status(200).json({ status: successMessage, data: result });
    }
  } catch (err) {
    return res.status(400).json({
      status: errorMessage,
      message: 'User with given id does not exist',
    });
  }
};

// eslint-disable-next-line no-return-await
exports.findUserByEmail = async (email) => await User.findOne({ email });
