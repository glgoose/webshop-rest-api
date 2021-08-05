const Joi = require("joi");

module.exports.loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).max(15).required(),
});
module.exports.registerSchema = Joi.object({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  password: Joi.string().min(6).max(15).required(),
});
