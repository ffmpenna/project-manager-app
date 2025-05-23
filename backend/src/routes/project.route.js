const route = require('express').Router();
const authenticateToken = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema,
  updateRoleSchema,
  createTaskSchema,
} = require('../validations');
const { projectController, taskController } = require('../controllers');

//Project Routes
route.get('/', authenticateToken, projectController.getAllProjects);
route.get('/:projectId', authenticateToken, projectController.findOneProject);
route.post(
  '/',
  authenticateToken,
  validate(createProjectSchema, 'Could not create project.'),
  projectController.createProject
);
route.put(
  '/:projectId',
  authenticateToken,
  validate(updateProjectSchema, 'Could not update project.'),
  projectController.updateProject
);
route.delete('/:projectId', authenticateToken, projectController.removeProject);

//ProjectMembers Related Routes
route.get(
  '/:projectId/members',
  authenticateToken,
  projectController.getProjectMembers
);
route.post(
  '/:projectId/members',
  authenticateToken,
  validate(addMemberSchema, 'Could not add member to project.'),
  projectController.addProjectMembers
);
route.put(
  '/:projectId/members/:memberId',
  authenticateToken,
  validate(updateRoleSchema, 'Could not update member role.'),
  projectController.updateProjectMemberRole
);
route.delete(
  '/:projectId/members/:memberId',
  authenticateToken,
  projectController.removeProjectMember
);

// Tasks related Routes
route.get(
  '/:projectId/tasks',
  authenticateToken,
  projectController.getProjectTasks
);
route.post(
  '/:projectId/tasks',
  authenticateToken,
  validate(createTaskSchema, 'Could not create task.'),
  taskController.createTask
);

module.exports = route;
