'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'projects',
      [
        {
          title: 'Projeto Alpha',
          description: 'Um projeto incrível para gerenciar tarefas.',
          created_by: 1, // ID do usuário João Silva
        },
        {
          title: 'Projeto Beta',
          description: 'Outro projeto para testes.',
          created_by: 2, // ID do usuário Maria Oliveira
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
