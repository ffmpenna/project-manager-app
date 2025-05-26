'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'projects_members',
      [
        {
          project_id: 1, // Projeto Alpha
          user_id: 1, // João Silva
          role: 'admin',
        },
        {
          project_id: 1, // Projeto Alpha
          user_id: 2, // Maria Oliveira
          role: 'member',
        },
        {
          project_id: 2, // Projeto Beta
          user_id: 2, // Maria Oliveira
          role: 'admin',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects_members', null, {});
  },
};
