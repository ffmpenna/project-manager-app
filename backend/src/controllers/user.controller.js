const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (req, res, next) => {
  try {
    const data = await userService.getAll();
    return res.status(200).json({ message: 'Users listed.', data });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await userService.findOne({ userId: Number(userId) });
    return res.status(200).json({ message: 'User found.', data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { userId } = req.params;
    const { id: requestingUserId } = req.user;
    const data = await userService.update({
      name,
      email,
      password,
      userId: Number(userId),
      requestingUser: Number(requestingUserId),
    });
    return res.status(200).json({ message: 'User updated.', data });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { id: requestingUserId } = req.user;

    const data = await userService.remove({
      userId: Number(userId),
      requestingUserId: Number(requestingUserId),
    });
    return res.status(200).json({ message: 'User removed.', data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  findOne,
  update,
  remove,
};
