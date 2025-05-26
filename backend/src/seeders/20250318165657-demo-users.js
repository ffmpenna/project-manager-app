'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'João Silva',
          email: 'joao.silva@example.com',
          password_hash: 'hash_da_senha_123', // Substitua por um hash real
        },
        {
          name: 'Maria Oliveira',
          email: 'maria.oliveira@example.com',
          password_hash: 'hash_da_senha_456', // Substitua por um hash real
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
