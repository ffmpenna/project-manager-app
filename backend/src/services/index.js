const authService = require('./auth.service');
const userService = require('./user.service');
const projectService = require('./project.service');
const projectMemberService = require('./projectMember.service');
const taskService = require('./task.service');
const commentService = require('./comment.service');
const notificationService = require('./notification.service');

module.exports = {
  authService,
  userService,
  projectService,
  projectMemberService,
  taskService,
  commentService,
  notificationService,
};
