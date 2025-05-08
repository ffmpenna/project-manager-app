'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          project_id: 1, // Projeto Alpha
          title: 'Configurar banco de dados',
          description: 'Configurar o banco de dados do projeto.',
          status: 'in_progress',
          assigned_to: 1, // João Silva
          due_date: new Date('2023-12-31'),
        },
        {
          project_id: 1, // Projeto Alpha
          title: 'Criar interface do usuário',
          description: 'Desenvolver a interface do usuário.',
          status: 'to_do',
          assigned_to: 2, // Maria Oliveira
          due_date: new Date('2023-11-15'),
        },
        {
          project_id: 2, // Projeto Beta
          title: 'Testar funcionalidades',
          description: 'Realizar testes no projeto.',
          status: 'done',
          assigned_to: 2, // Maria Oliveira
          due_date: new Date('2023-10-30'),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
