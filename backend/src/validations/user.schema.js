const Joi = require('joi');

const nameSchema = Joi.string()
  .min(3)
  .max(100)
  .pattern(/^[\p{L}\s'-.]+$/u)
  .message('/name/ must contain only letters, spaces, apostrophes and hyphens');

const emailSchema = Joi.string().email({ minDomainSegments: 2 }).trim().lowercase();

const passwordSchema = Joi.string()
  .min(8)
  .pattern(new RegExp('^(?=.*[a-z])'), 'lowercase')
  .pattern(new RegExp('^(?=.*[A-Z])'), 'uppercase')
  .pattern(new RegExp('^(?=.*[0-9])'), 'number')
  .pattern(new RegExp('^(?=.*[!@#$%^&*])'), 'special character (!-@-#-$-%-^-&-*)')
  .messages({
    'string.pattern.name': '/password/ must contain at least one {#name}',
  });

const createUserSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
});

const updateUserSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
}).min(1);

const loginUserSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
};
