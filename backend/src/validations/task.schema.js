const Joi = require('joi');

const titleSchema = Joi.string().min(3).max(100);
const descriptionSchema = Joi.string().max(500).trim();
const dueDateSchema = Joi.date().greater('now');
const assignedToSchema = Joi.number().integer().positive();

const assignTaskSchema = Joi.object({
  userId: assignedToSchema.required(),
});

const createTaskSchema = Joi.object({
  title: titleSchema.required(),
  description: descriptionSchema,
  dueDate: dueDateSchema,
  assignedTo: assignedToSchema,
});

const updateTaskSchema = Joi.object({
  title: titleSchema,
  description: descriptionSchema,
  dueDate: dueDateSchema,
  assignedTo: assignedToSchema,
})
  .min(1)
  .message('at least one field must be updated');

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  assignTaskSchema,
};
