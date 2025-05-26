const { notificationService } = require('../services');

const getUserNotifications = async (req, res, next) => {
  const userId = req.user.id;
  const { onlyUnread } = req.query;
  try {
    const data = await notificationService.getUserNotifications({
      userId,
      onlyUnread,
    });
    return res.status(200).json({ message: 'Notifications listed.', data });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  const userId = req.user.id;
  const { notificationId } = req.params;
  try {
    const data = await notificationService.markAsRead({
      userId: Number(userId),
      notificationId: Number(notificationId),
      all: false,
    });
    res.status(200).json({ message: 'Notification marked as read.', data });
  } catch (error) {
    next(error);
  }
};

const markAllAsRead = async (req, res, next) => {
  const userId = req.user.id;
  const notificationId = req.params.id;
  try {
    const data = await notificationService.markAsRead({
      userId,
      notificationId,
      all: true,
    });
    res.status(200).json({ message: 'Notification marked as read.', data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
};
