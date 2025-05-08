const { Task } = require('../models');
const { BadRequestError } = require('../utils/CustomErrors');
const verifyEntityExists = require('../utils/verifyEntityExists');
const { verifyProjectMemberExists } = require('./projectMemberValidations');
const { verifyUserExists } = require('./userValidations');

const verifyTaskExists = ({ taskId, transaction }) =>
  verifyEntityExists({
    id: taskId,
    model: Task,
    entityName: 'Task',
    transaction,
  });

const verifyStatusValue = (value) => {
  const allowedValues = ['to_do', 'in_progress', 'done'];

  if (!value) {
    throw new BadRequestError('Value param is missing.');
  }

  if (!allowedValues.includes(value)) {
    throw new BadRequestError(`Status value must be one of ${allowedValues}.`);
  }
};

const assignMemberValidations = async ({ userId, taskId, transaction }) => {
  const task = await Task.findByPk(taskId, { transaction });

  await verifyTaskExists({ taskId, transaction });

  const projectId = task.get('projectId');

  await Promise.all([
    verifyUserExists({ userId, transaction }),
    verifyProjectMemberExists({ projectId, userId }),
  ]);
};

const patchTaskStatusValidations = async ({ taskId, value, transaction }) => {
  await verifyTaskExists({ taskId, transaction });
  verifyStatusValue(value);
};

module.exports = {
  verifyTaskExists,
  verifyStatusValue,
  assignMemberValidations,
  patchTaskStatusValidations,
};
