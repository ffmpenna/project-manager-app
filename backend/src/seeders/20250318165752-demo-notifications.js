'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'notifications',
      [
        {
          user_id: 1, // João Silva
          message: 'Você foi atribuído à tarefa "Configurar banco de dados".',
          is_read: false,
        },
        {
          user_id: 2, // Maria Oliveira
          message: 'Nova tarefa "Criar interface do usuário" atribuída a você.',
          is_read: true,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('notifications', null, {});
  },
};
