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

route.get('/', authenticateToken, userController.getAll); // tested ✅
route.get('/:userId', authenticateToken, userController.findOne); // tested ✅
route.put(
  '/:userId',
  authenticateToken,
  validate(updateUserSchema, 'Could not update user.'),
  userController.update,
); // tested ✅
route.delete('/:userId', authenticateToken, userController.remove); // tested ✅

route.get('/:userId/projects', authenticateToken, projectController.getProjectsByUserId); // tested ✅

route.get('/:userId/tasks', authenticateToken, taskController.getTasksByUser);

route.get('/:userId/comments', authenticateToken, commentController.getCommentsByUserId); // tested ✅

module.exports = route;
