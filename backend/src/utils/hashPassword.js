const bcrypt = require('bcrypt');
const saltRounds = 12;

const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, saltRounds);
};

const comparePassword = async ({ plainPassword, hashedPassword }) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
