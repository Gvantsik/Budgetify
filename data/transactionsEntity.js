const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: {
        values: ['income', 'expense'],
        message: '{VALUE} is not relevant',
      },
    },
    title: String,
    description: String,
    account_id: { type: mongoose.ObjectId, ref: 'Account' },
    category_id: { type: mongoose.ObjectId, ref: 'Category' },
    amount: Number,
  },

  { timestamps: true }
);

module.exports = mongoose.model('Categroy', categorySchema);
