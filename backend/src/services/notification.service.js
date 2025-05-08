const { Notification, UserNotification } = require('../models');
const handleTransaction = require('../utils/handleTransaction');

const notifyMany = async ({ userIds, type, message, metadata = {} }) => {
  handleTransaction(async (transaction) => {
    const notification = await Notification.create(
      { type, message, metadata },
      { transaction },
    );

    const userNotifications = userIds.map((userId) => ({
      userId,
      notificationId: notification.id,
      isRead: false,
    }));

    await UserNotification.bulkCreate(userNotifications, { transaction });
    return notification;
  });
};

const getUserNotifications = async ({ userId, onlyUnread = false }) => {
  handleTransaction(async (transaction) => {
    const where = { userId };
    if (onlyUnread) where.isRead = false;

    const records = await UserNotification.findAll({
      where,
      include: [{ model: Notification, as: 'notification' }],
      transaction,
    });

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

    if (all) where.isRead = false;
    else where.notificationId = notificationId;

    const [updatedCount] = await UserNotification.update(
      { isRead: true, readAt: Date.now() },
      { where, transaction },
    );

    return { updatedCount };
  });
};

module.exports = {
  notifyMany,
  getUserNotifications,
  markAsRead,
};
