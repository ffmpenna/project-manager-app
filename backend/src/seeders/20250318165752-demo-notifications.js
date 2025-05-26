'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'notifications',
      [
        {
          type: 'TASK_ASSIGNED',
          message: 'Você foi atribuído à tarefa "Configurar banco de dados".',
          metadata: JSON.stringify({
            taskId: 1,
            projectId: 1,
            assignedToId: 1,
            assignedById: 1,
          }),
        },
        {
          type: 'TASK_ASSIGNED',
          message: 'Você foi atribuído à tarefa "Configurar o Sequelize".',
          metadata: JSON.stringify({
            taskId: 3,
            projectId: 2,
            assignedToId: 2,
            assignedById: 2,
          }),
        },
        {
          type: 'COMMENT',
          message: 'Novo comentário na tarefa "Configurar banco de dados".',
          metadata: JSON.stringify({
            taskId: 1,
            projectId: 1,
            commentId: 1,
            authorId: 1,
          }),
        },
        {
          type: 'COMMENT',
          message: 'Novo comentário na tarefa "Configurar o Sequelize".',
          metadata: JSON.stringify({
            taskId: 1,
            projectId: 1,
            commentId: 2,
            authorId: 2,
          }),
        },
        {
          type: 'COMMENT',
          message: 'Novo comentário na tarefa "Configurar o Sequelize".',
          metadata: JSON.stringify({
            taskId: 3,
            projectId: 2,
            commentId: 2,
            authorId: 2,
          }),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notifications', null, {});
  },
};
