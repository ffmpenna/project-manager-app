const { User } = require('../models/');
const { comparePassword } = require('../utils/hashPassword');
const { UnauthorizedError } = require('../utils/CustomErrors');

// This function validates user credentials during authentication.
const authValidations = async ({ email, password, transaction }) => {
  const user = await User.findOne({ where: { email }, transaction });

  if (!user) {
    throw new UnauthorizedError('Wrong credentials.');
  }

  const hashedPassword = user.get('passwordHash');

  const validPassword = await comparePassword({
    plainPassword: password,
    hashedPassword,
  });

  if (!validPassword) {
    throw new UnauthorizedError('Wrong credentials.');
  }

  return user;
};

module.exports = authValidations;
