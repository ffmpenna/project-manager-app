'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',
          key: 'id',
        },
        field: 'project_id',
        onDelete: 'CASCADE',
      },
      description: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM('to_do', 'in_progress', 'done'),
        defaultValue: 'to_do',
      },
      assignedTo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        defaultValue: null,
        field: 'assigned_to',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      dueDate: {
        type: Sequelize.DATE,
        field: 'due_date',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  },
};
