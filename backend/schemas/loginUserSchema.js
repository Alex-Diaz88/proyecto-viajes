const Joi = require('joi');

const loginUserSchema = Joi.object().keys({
    email: Joi.string()
        .required()
        .email()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                default:
                    return new Error('Debes indicar un email.');
            }
        }),

    password: Joi.string()
        .required()
        .min(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                default:
                    return new Error('Debes indicar una contraseña.');
            }
        }),
});

module.exports = loginUserSchema;
