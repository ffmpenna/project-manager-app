const { authService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = await authService.register({
      name,
      email,
      password,
    });
    return res.status(201).json({ message: 'User created.', data });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const data = await authService.login({ email, password });
    res.status(200).json({ message: 'User logged in.', data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
