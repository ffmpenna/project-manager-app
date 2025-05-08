'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          task_id: 1, // Tarefa "Configurar banco de dados"
          user_id: 1, // João Silva
          content: 'Iniciei a configuração do banco de dados.',
        },
        {
          task_id: 1, // Tarefa "Configurar banco de dados"
          user_id: 2, // Maria Oliveira
          content: 'Preciso de ajuda com a migração.',
        },
        {
          task_id: 3, // Tarefa "Testar funcionalidades"
          user_id: 2, // Maria Oliveira
          content: 'Testes concluídos com sucesso!',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
