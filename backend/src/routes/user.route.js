const route = require('express').Router();
const validate = require('../middlewares/validation.middleware');
const { updateUserSchema } = require('../validations');
const {
  userController,
  projectController,
  taskController,
  commentController,
} = require('../controllers');
const authenticateToken = require('../middlewares/auth.middleware');

// ================================================ Users Routes ================================================ //

route.get('/', authenticateToken, userController.getAllUsers);

route.get('/:userId', authenticateToken, userController.findOneUser);

route.put(
  '/:userId',
  authenticateToken,
  validate(updateUserSchema, 'Could not update user.'),
  userController.updateUser
);
route.delete('/:userId', authenticateToken, userController.removeUser);

// ================================================ Projects Related Routes ================================================ //

route.get(
  '/:userId/projects',
  authenticateToken,
  projectController.getProjectsByUserId
);

// ================================================ Tasks Related Routes ================================================ //

route.get('/:userId/tasks', authenticateToken, taskController.getTasksByUser);

// ================================================ Comments Related Routes ================================================ //

route.get(
  '/:userId/comments',
  authenticateToken,
  commentController.getCommentsByUserId
);

module.exports = route;
