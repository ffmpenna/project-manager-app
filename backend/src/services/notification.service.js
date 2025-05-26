const { Notification, UserNotification } = require('../models');
const handleTransaction = require('../utils/handleTransaction');

const notifyMany = async ({ userIds, type, message, metadata = {} }) => {
  handleTransaction(async (transaction) => {
    // Create a notification in the Notification table.
    const notification = await Notification.create(
      { type, message, metadata },
      { transaction }
    );

    // Create array of user notifications to relate the notification to each user.
    const userNotifications = userIds.map((userId) => ({
      userId,
      notificationId: notification.id,
      isRead: false,
    }));

    // Corelate the notification to all users related to the notification.
    await UserNotification.bulkCreate(userNotifications, { transaction });
    return notification;
  });
};

const getUserNotifications = async ({ userId, onlyUnread = false }) => {
  handleTransaction(async (transaction) => {
    const where = { userId };
    // If onlyUnread is true, filter notifications that are unread.
    if (onlyUnread) where.isRead = false;

    const records = await UserNotification.findAll({
      where,
      include: [{ model: Notification, as: 'notification' }],
      transaction,
    });

    // Format the records to return only necessary fields.
    const formattedRecords = records.map((record) => ({
      id: record.notification.id,
      type: record.notification.type,
      message: record.notification.message,
      metadata: record.notification.metadata,
      isRead: record.isRead,
      readAt: record.readAt,
    }));

    return {
      count: formattedRecords.length,
      notifications: formattedRecords,
    };
  });
};

const markAsRead = async ({ userId, notificationId, all = false }) => {
  handleTransaction(async (transaction) => {
    const where = { userId };

    // If all is true, mark all notifications as read for the user.
    // Otherwise, mark the specific notification as read.
    if (all) where.isRead = false;
    else where.notificationId = notificationId;

    const [updatedCount] = await UserNotification.update(
      { isRead: true, readAt: Date.now() },
      { where, transaction }
    );

    return { updatedCount };
  });
};

module.exports = {
  notifyMany,
  getUserNotifications,
  markAsRead,
};
