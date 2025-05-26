const { Task } = require('../models/');
const { ForbiddenError } = require('../utils/CustomErrors');
const handleTransaction = require('../utils/handleTransaction');
const {
  verifyProjectExists,
  verifyUserExists,
  assignMemberValidations,
  verifyTaskExists,
  verifyProjectMemberExists,
  verifyStatusValue,
} = require('../validations');
const { notifyMany } = require('./notification.service');

const createTask = async ({ userId, projectId, taskData }) => {
  return handleTransaction(async (transaction) => {
    // Verify that user and project exists.
    await verifyProjectExists({ projectId, transaction });
    await verifyProjectMemberExists({ projectId, userId, transaction });

    const task = await Task.create({ projectId, ...taskData }, { transaction });
    return { task };
  });
};

const findOneTask = async ({ taskId }) => {
  return handleTransaction(async (transaction) => {
    // Verify that task exists.
    await verifyTaskExists({ taskId, transaction });

    const task = await Task.findByPk(taskId, { transaction });
    return { task };
  });
};

const getAllTasks = async () => {
  return handleTransaction(async (transaction) => {
    const tasks = await Task.findAll({ transaction });
    return { count: tasks.length, tasks };
  });
};

const getTasksByUser = async ({ userId }) => {
  return handleTransaction(async (transaction) => {
    // Verify that user exists.
    await verifyUserExists({ userId, transaction });

    const tasks = await Task.findAll({
      where: { assignedTo: userId },
      transaction,
    });
    return { count: tasks.length, tasks };
  });
};

const removeTask = async ({ taskId, userId }) => {
  return handleTransaction(async (transaction) => {
    // Verify that task exists and user that is trying to remove it is a member of the project.
    const { task } = await verifyTaskExists({ taskId, transaction });
    await verifyProjectMemberExists({
      projectId: task.projectId,
      userId,
      transaction,
    });

    const deletedCount = await Task.destroy({
      where: { id: taskId },
      transaction,
    });
    return { deletedCount };
  });
};

const updateTask = async ({ userId, taskId, taskData }) => {
  return handleTransaction(async (transaction) => {
    // Verify that task exists and user that is trying to update it is a member of the project.
    const { task } = await verifyTaskExists({ taskId, transaction });

    await verifyProjectMemberExists({
      projectId: task.projectId,
      userId,
      transaction,
    });

    const [affectedRows] = await Task.update(taskData, {
      where: { id: taskId },
      transaction,
    });
    return { affectedRows };
  });
};

const patchTaskStatus = async ({ userId, taskId, value }) => {
  return handleTransaction(async (transaction) => {
    // Verify that task exists, that user that is trying to update it is a member of the project and that status value is valid.
    const { task } = await verifyTaskExists({ taskId, transaction });
    await verifyProjectMemberExists({
      userId,
      projectId: task.projectId,
      transaction,
    });
    verifyStatusValue(value);

    const [affectedRows] = await Task.update(
      { status: value },
      {
        where: { id: taskId },
        transaction,
      }
    );
    return { affectedRows };
  });
};

const assignMemberToTask = async ({ assignedToId, assignedById, taskId }) => {
  return handleTransaction(async (transaction) => {
    // Verify that task exists, that user that is trying to assign it is a member of the project
    // Then validate that assigned user exists and also is a project member.
    await assignMemberValidations({
      assignedById,
      assignedToId,
      taskId,
      transaction,
    });
    const { projectId } = await Task.findByPk(taskId, { transaction });

    const [affectedRows] = await Task.update(
      { assignedTo: assignedToId },
      {
        where: { id: taskId },
        transaction,
      }
    );

    // Notify the assigned user about the new task assignment.
    await notifyMany({
      userIds: [assignedToId],
      type: 'TASK_ASSIGNED',
      message: 'You have been assigned a new task',
      metadata: { taskId, projectId, assignedToId, assignedById },
    });

    return { affectedRows };
  });
};

const unassignTask = async ({ userId, taskId }) => {
  return handleTransaction(async (transaction) => {
    // Verify that task exists and user that is trying to unassign it is a member of the project.
    const { task } = await verifyTaskExists({ taskId, transaction });
    await verifyProjectMemberExists({
      userId,
      projectId: task.projectId,
      transaction,
    });

    const [affectedRows] = await Task.update(
      { assignedTo: null },
      {
        where: { id: taskId },
        transaction,
      }
    );
    return { affectedRows };
  });
};

module.exports = {
  createTask,
  findOneTask,
  getAllTasks,
  getTasksByUser,
  removeTask,
  updateTask,
  patchTaskStatus,
  assignMemberToTask,
  unassignTask,
};
