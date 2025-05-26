'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user_notifications',
      [
        {
          user_id: 1,
          notification_id: 1,
          is_read: false,
          read_at: null,
        },
        {
          user_id: 2,
          notification_id: 2,
          is_read: false,
          read_at: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_notifications', null, {});
  },
};
