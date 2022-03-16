const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 200,
    },
    currency: { type: String, minlength: 3, maxlength: 3 },

    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Account', accountSchema);
