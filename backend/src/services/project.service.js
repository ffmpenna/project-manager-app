const { Project, Task } = require('../models/');
const handleTransaction = require('../utils/handleTransaction');
const { verifyProjectExists, verifyProjectOwnership } = require('../validations');

const getAllProjects = async ({ createdBy }) => {
  return handleTransaction(async (transaction) => {
    const where = createdBy ? { createdBy } : {};
    const projects = await Project.findAll({ where, transaction });

    return { count: projects.length, projects };
  });
};

const findOneProject = async ({ projectId }) => {
  return handleTransaction(async (transaction) => {
    const { project } = await verifyProjectExists({ projectId, transaction });
    return { project };
  });
};

const insertProject = async ({ projectData, userId }) => {
  return handleTransaction(async (transaction) => {
    const project = await Project.create(
      { createdBy: userId, ...projectData },
      { transaction },
    );

    return { project };
  });
};

const updateProject = async ({ projectData, projectId, userId }) => {
  return handleTransaction(async (transaction) => {
    const { project } = await verifyProjectExists({ projectId, transaction });

    const ownerId = project.createdBy;

    await verifyProjectOwnership({ ownerId, userId });

    const [affectedRows] = await Project.update(projectData, {
      where: { id: projectId },
      transaction,
    });

    const updatedProject = await Project.findByPk(projectId, { transaction });

    return { affectedRows, updatedProject };
  });
};

const removeProject = async ({ projectId, userId }) => {
  return handleTransaction(async (transaction) => {
    const { project } = await verifyProjectExists({ projectId, transaction });
    const ownerId = project.createdBy;
    await verifyProjectOwnership({ ownerId, userId });

    const deletedCount = await Project.destroy({
      where: { id: projectId },
      transaction,
    });

    return { deletedCount };
  });
};

const getProjectTasks = async ({ projectId }) => {
  return handleTransaction(async (transaction) => {
    await verifyProjectExists({ projectId, transaction });

    const tasks = await Task.findAll({
      where: { projectId },
      transaction,
    });
    return { count: tasks.length, tasks };
  });
};

module.exports = {
  getAllProjects,
  findOneProject,
  insertProject,
  updateProject,
  removeProject,
  getProjectTasks,
};
