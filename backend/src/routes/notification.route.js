const route = require('express').Router();
const { notificationController } = require('../controllers');
const authenticateToken = require('../middlewares/auth.middleware');

// ================================================ Notifications Routes ================================================ //

route.get('/', authenticateToken, notificationController.getUserNotifications);

route.patch(
  '/:notificationId/read',
  authenticateToken,
  notificationController.markAsRead
);

route.patch(
  '/read-all',
  authenticateToken,
  notificationController.markAllAsRead
);

module.exports = route;
