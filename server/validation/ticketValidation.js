const Joi = require("joi");

const createTicketSchema = Joi.object({

    title: Joi.string()
        .min(5)
        .max(200)
        .required(),

    description: Joi.string()
        .min(10)
        .required(),

    priority: Joi.string()
        .valid("LOW", "MEDIUM", "HIGH")
        .required()

});

module.exports = {
    createTicketSchema
};