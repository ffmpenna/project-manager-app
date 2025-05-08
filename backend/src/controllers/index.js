const authController = require('./auth.controller');
const userController = require('./user.controller');
const projectController = require('./project.controller');
const taskController = require('./task.controller');
const commentController = require('./comment.controller');
const notificationController = require('./notification.controller');

module.exports = {
  authController,
  userController,
  projectController,
  taskController,
  commentController,
  notificationController,
};
