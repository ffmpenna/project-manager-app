const route = require('express').Router();
const { taskController, commentController } = require('../controllers');
const authenticateToken = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const {
  updateTaskSchema,
  createCommentSchema,
  updateCommentSchema,
  assignTaskSchema,
} = require('../validations');

// ================================================ Task Routes ================================================ //

route.get('/', authenticateToken, taskController.getAllTasks);

route.get('/:taskId', authenticateToken, taskController.findOneTask);

route.delete('/:taskId', authenticateToken, taskController.removeTask);

route.put(
  '/:taskId',
  authenticateToken,
  validate(updateTaskSchema, 'Could not update task.'),
  taskController.updateTask
);

route.patch(
  '/:taskId/status',
  authenticateToken,
  taskController.patchTaskStatus
);

route.patch(
  '/:taskId/assign',
  authenticateToken,
  validate(assignTaskSchema),
  taskController.assignMemberToTask
);

route.patch(
  '/:taskId/unassign',
  authenticateToken,
  taskController.unassignTask
);

// ================================================ Comments Related Routes ================================================ //

route.get(
  '/:taskId/comments',
  authenticateToken,
  commentController.getAllTaskComments
);

route.post(
  '/:taskId/comments',
  authenticateToken,
  validate(createCommentSchema, 'Could not create comment.'),
  commentController.createComment
);

route.put(
  '/:taskId/comments/:commentId',
  authenticateToken,
  validate(updateCommentSchema, 'Could not update comment.'),
  commentController.updateComment
);

route.delete(
  '/:taskId/comments/:commentId',
  authenticateToken,
  commentController.removeComment
);

module.exports = route;
