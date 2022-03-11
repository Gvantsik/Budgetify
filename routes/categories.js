const express = require('express');
const passport = require('passport');
const {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoriesController');

const categoriesRouter = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });
categoriesRouter
  .get('/', authGuard, getAllCategories)
  .post('/', authGuard, createCategory);

categoriesRouter
  .get('/:id', authGuard, getOneCategory)
  .patch('/:id', authGuard, updateCategory)
  .delete('/:id', authGuard, deleteCategory);

module.exports = categoriesRouter;
