'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          task_id: 1, // Tarefa "Configurar banco de dados"
          author: 1, // João Silva
          content: 'Iniciei a configuração do banco de dados.',
        },
        {
          task_id: 1, // Tarefa "Configurar banco de dados"
          author: 2, // Maria Oliveira
          content: 'Preciso de ajuda com a migração.',
        },
        {
          task_id: 3, // Tarefa "Testar funcionalidades"
          author: 2, // Maria Oliveira
          content: 'Testes concluídos com sucesso!',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
