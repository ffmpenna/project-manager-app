const route = require('express').Router();
const validate = require('../middlewares/validation.middleware');
const { createUserSchema, loginUserSchema } = require('../validations');
const { authController } = require('../controllers');

route.post(
  '/register',
  validate(createUserSchema, 'Could not create user.'),
  authController.register,
);

route.post(
  '/login',
  validate(loginUserSchema, 'Could not login user.'),
  authController.login,
);

module.exports = route;
