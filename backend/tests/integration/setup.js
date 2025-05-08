const request = require('supertest');
const { sequelize } = require('../../src/models');
const { mockRegisterUser } = require('../helpers');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');

let authToken, loggedUser;

before(async () => {
  await sequelize.sync({ force: true });
  const { name, email, password } = mockRegisterUser();
  await request(app).post('/auth/register').send({ name, email, password });
  const res = await request(app).post('/auth/login').send({ email, password });

  authToken = res.body.data.token;
  loggedUser = jwt.decode(authToken);

  console.log('✅ Banco de dados sincronizado');
});

after(async () => {
  await sequelize.close();
  console.log('🔌 Conexão com o banco fechada');
});

module.exports = {
  getToken: () => authToken,
  getLoggedUser: () => loggedUser,
};
