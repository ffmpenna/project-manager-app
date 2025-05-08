const Joi = require('joi');

const contentSchema = Joi.string().min(3).max(500).trim();

const createCommentSchema = Joi.object({
  content: contentSchema.required(),
});

const updateCommentSchema = Joi.object({
  content: contentSchema.required(),
})
  .min(1)
  .message('at least one field must be updated');

module.exports = {
  createCommentSchema,
  updateCommentSchema,
};
