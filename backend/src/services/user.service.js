const { User } = require('../models/');
const { NotFoundError, ForbiddenError } = require('../utils/CustomErrors');
const handleTransaction = require('../utils/handleTransaction');
const { hashPassword } = require('../utils/hashPassword');
const { verifyUserExists } = require('../validations');

const getAll = async () => {
  return handleTransaction(async (transaction) => {
    const foundUsers = await User.findAll({
      attributes: {
        exclude: 'passwordHash',
      },
      transaction,
    });

    return { count: foundUsers.length, users: foundUsers };
  });
};

const findOne = async ({ userId }) => {
  return handleTransaction(async (transaction) => {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: 'passwordHash',
      },
      transaction,
    });

    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    return { user };
  });
};

const update = async ({ name, email, password, userId, requestingUserId }) => {
  return handleTransaction(async (transaction) => {
    await verifyUserExists({ userId, transaction });

    if (userId !== requestingUserId) {
      throw new ForbiddenError('You are not authorized to update this user');
    }

    const updateFields = { name, email };

    if (password) {
      updateFields.passwordHash = await hashPassword(password);
    }

    const [affectedRows] = await User.update(updateFields, {
      where: { id: userId },
      transaction,
    });

    return { usersUpdated: affectedRows };
  });
};

const remove = async ({ userId, requestingUserId }) => {
  return handleTransaction(async (transaction) => {
    await verifyUserExists({ userId, transaction });

    if (userId !== requestingUserId) {
      throw new ForbiddenError('You are not authorized to remove this user');
    }

    const usersRemoved = await User.destroy({
      where: { id: userId },
      transaction,
    });

    return { usersRemoved };
  });
};

module.exports = {
  getAll,
  findOne,
  update,
  remove,
};
