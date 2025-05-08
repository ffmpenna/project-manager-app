const { User, Project, Task, Comment, ProjectMember } = require('../../src/models');
const { mockUser, mockProject, mockTask, mockComment, mockProjectMember } = require('./');
const { getToken, getLoggedUser } = require('../integration/setup');

const DEFAULT_LENGTH = 10;

const createTestContext = async () => {
  const loggedUser = await getLoggedUser();
  const user = await User.create(mockUser());
  const projects = await Project.bulkCreate(mockProject(loggedUser.id, DEFAULT_LENGTH));
  const projectMember = await ProjectMember.create({
    userId: loggedUser.id,
    projectId: projects[0].id,
  });

  const tasks = await Task.bulkCreate(mockTask(projects[0].id, DEFAULT_LENGTH));
  const comments = await Comment.bulkCreate(
    mockComment(tasks[0].id, loggedUser.id, DEFAULT_LENGTH),
  );
  const token = await getToken();

  return {
    loggedUser,
    user,
    projects,
    projectMember,
    tasks,
    comments,
    token,
  };
};

const cleanupTestData = async () => {
  await ProjectMember.destroy({ where: {} });
  await Project.destroy({ where: {} });
  await Task.destroy({ where: {} });
  await Comment.destroy({ where: {} });
};

module.exports = {
  createTestContext,
  cleanupTestData,
};
