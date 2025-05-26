'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_notifications', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'user_id',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      notificationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'notifications',
          key: 'id',
        },
        field: 'notification_id',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_read',
      },
      readAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'read_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserNotifications');
  },
};
