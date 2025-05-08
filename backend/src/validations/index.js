const { createUserSchema, updateUserSchema, loginUserSchema } = require('./user.schema');

const {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema,
  updateRoleSchema,
} = require('./project.schema');

const {
  createTaskSchema,
  updateTaskSchema,
  assignTaskSchema,
  patchTaskStatus,
} = require('./task.schema');

const { createCommentSchema, updateCommentSchema } = require('./comment.schema');

const { verifyProjectExists, verifyProjectOwnership } = require('./projectValidations');

const { verifyUserExists, verifyManyUsersExists } = require('./userValidations');

const {
  verifyTaskExists,
  verifyStatusValue,
  assignMemberValidations,
  patchTaskStatusValidations,
} = require('./taskValidations');

const {
  verifyConflictMembers,
  verifyProjectMemberExists,
} = require('./projectMemberValidations');

const {
  verifyCommentExists,
  verifyCommentBelongsToUser,
} = require('./commentValidations');

const authValidations = require('./authValidations');

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
  createProjectSchema,
  updateProjectSchema,
  createCommentSchema,
  updateCommentSchema,
  addMemberSchema,
  updateRoleSchema,
  createTaskSchema,
  updateTaskSchema,
  assignTaskSchema,
  patchTaskStatus,
  authValidations,
  verifyTaskExists,
  patchTaskStatusValidations,
  verifyStatusValue,
  assignMemberValidations,
  verifyProjectExists,
  verifyProjectOwnership,
  verifyUserExists,
  verifyManyUsersExists,
  verifyProjectMemberExists,
  verifyConflictMembers,
  verifyCommentExists,
  verifyCommentBelongsToUser,
};
