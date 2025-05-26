const Joi = require('joi');

const titleSchema = Joi.string().min(3).max(100).trim();
const descriptionSchema = Joi.string().max(500).trim();

const roleSchema = Joi.string().valid('member', 'admin').messages({
  'any.only':
    'The field (role) on user (position {#index + 1}) must be one of [admin, member].',
});

const memberSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  role: roleSchema,
});

const createProjectSchema = Joi.object({
  title: titleSchema.required(),
  description: descriptionSchema,
});

const updateProjectSchema = Joi.object({
  title: titleSchema,
  description: descriptionSchema,
})
  .min(1)
  .message('At least one field must be updated.');

const addMemberSchema = Joi.array().items(memberSchema);

const updateRoleSchema = Joi.object({
  role: Joi.string().valid('member', 'admin'),
})
  .min(1)
  .message('At least one field must be updated');
module.exports = {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema,
  updateRoleSchema,
};
