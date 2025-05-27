const Joi = require("joi");

exports.taskValidation = (data) =>
  Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid("pending", "completed","inprogress").default("pending"),
    priority: Joi.string().valid("high", "medium", "low").default("medium"),
    endDate: Joi.date().optional().min('now').messages({
      "date.min": "End date cannot be in the past",
      "date.base": "End date must be a valid date"
    }),
  }).validate(data);
