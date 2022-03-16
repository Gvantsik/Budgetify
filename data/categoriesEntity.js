const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    type: {
      type: String,
      enum: {
        values: ['income', 'expense'],
        message: '{VALUE} is not relevant',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categroy', categorySchema);
