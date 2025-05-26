'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM(
          'COMMENT',
          'TASK_ASSIGNED',
          'TASK_COMPLETED',
          'PROJECT_ASSIGNED'
        ),
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Notifications_type";'
    );
  },
};
