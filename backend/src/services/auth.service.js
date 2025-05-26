const { User } = require('../models/');
const jwt = require('jsonwebtoken');
const handleTransaction = require('../utils/handleTransaction');
const { hashPassword } = require('../utils/hashPassword');
const { authValidations } = require('../validations');
const { InternalServerError } = require('../utils/CustomErrors');
const JWT_SECRET = process.env.JWT_SECRET || 'topsecret';

const register = async ({ name, email, password }) => {
  return handleTransaction(async (transaction) => {
    const passwordHash = await hashPassword(password);
    const user = await User.create(
      { name, email, passwordHash },
      { transaction }
    );

    if (!user) {
      return InternalServerError('Could not create user.');
    }
    // Exclude passwordHash from the returned user data.
    const { passwordHash: _, ...safeUserData } = user.get({ plain: true });

    return { user: safeUserData };
  });
};

const login = async ({ email, password }) => {
  return handleTransaction(async (transaction) => {
    // Validate user credentials
    const user = await authValidations({ email, password, transaction });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  });
};

module.exports = {
  register,
  login,
};
