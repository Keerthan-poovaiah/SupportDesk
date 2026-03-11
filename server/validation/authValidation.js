const Joi = require("joi");

const registerSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .max(50)
        .required()

});

module.exports = {
    registerSchema
};

const loginSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required()

});

module.exports = {
    registerSchema,
    loginSchema
};