const { userService } = require('../services');

const getAllUsers = async (req, res, next) => {
  try {
    const data = await userService.getAllUsers();
    return res.status(200).json({ message: 'Users listed.', data });
  } catch (error) {
    next(error);
  }
};

const findOneUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const data = await userService.findOneUser({ userId: Number(userId) });
    return res.status(200).json({ message: 'User found.', data });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { userId } = req.params;
  const { id: requestingUserId } = req.user;
  try {
    const data = await userService.updateUser({
      name,
      email,
      password,
      userId: Number(userId),
      requestingUserId: Number(requestingUserId),
    });
    return res.status(200).json({ message: 'User updated.', data });
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req, res, next) => {
  const { userId } = req.params;
  const { id: requestingUserId } = req.user;
  try {
    const data = await userService.removeUser({
      userId: Number(userId),
      requestingUserId: Number(requestingUserId),
    });
    return res.status(200).json({ message: 'User removed.', data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  findOneUser,
  updateUser,
  removeUser,
};
