const { User } = require('../models');
const { NotFoundError } = require('../utils/CustomErrors');
const verifyEntityExists = require('../utils/verifyEntityExists');

const verifyUserExists = ({ userId, transaction }) =>
  verifyEntityExists({
    id: userId,
    model: User,
    entityName: 'User',
    transaction,
  });

const verifyManyUsersExists = async ({ members, transaction }) => {
  const userIds = members.map((m) => m.userId);
  const users = await User.findAll({ where: { id: userIds }, transaction });

  if (users.length !== members.length) {
    const missingIds = userIds.filter((id) => !users.some((u) => String(u.id) === id));

    throw new NotFoundError('Users not found', { missingIds });
  }
};

module.exports = {
  verifyUserExists,
  verifyManyUsersExists,
};
