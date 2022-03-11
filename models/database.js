const bcrypt = require('bcrypt');

const database = {
  users: [
    {
      id: 1,
      name: 'Bob',
      email: 'bob@gmail.com',
      password: '123456',
      userRole: 'admin',
    },
    {
      id: 2,
      name: 'John',
      email: 'j@gmail.com',
      password: bcrypt.hashSync('1234578', 10),
      userRole: 'user',
    },
  ],
  accounts: [
    {
      id: 1,
      user_id: 2,
      name: 'myAccEUR',
      currency: 'EUR',
      balance: 1000,
    },
    {
      id: 2,
      user_id: 2,
      name: 'myAccUSD',
      currency: 'USD',
      balance: 200,
    },
  ],
  categories: [
    {
      id: 1,
      user_id: 2,
      name: 'Shopping',
      isExpense: true,
    },
  ],
  transactions: [
    {
      id: 1,
      user_id: 2,
      account_id: 2,
      amount: 100,
      category_id: 1,
      date: new Date(),
    },
  ],
};

module.exports = database;
