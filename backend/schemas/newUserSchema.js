const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    password: Joi.string()
        .required()
        .min(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'string.min':
                    return new Error(
                        'Lo sentimos, la contraseña debe tener un minimo de 5 caracteres. '
                    );
                default:
                    return new Error('Debes indicar una contraseña.');
            }
        }),
    email: Joi.string()
        .required()
        .email()
        .error((errors) => {
            switch (errors[0].code) {
                case 'string.email':
                    return new Error('El email no es valido.');

                default:
                    return new Error('Debes indicar un email.');
            }
        }),
    username: Joi.string()
        .required()
        .min(2)
        .max(20)
        .regex(/[A-Za-z0-9]/)
        .error((errors) => {
            switch (errors[0].code) {
                case 'string.min':
                    return new Error(
                        'Lo sentimos, el nombre de usuario debe tener un mínimo de 2 caracteres.'
                    );
                case 'string.max':
                    return new Error(
                        'Lo sentimos, el nombre de usuario no puede tener mas de 20 caracteres.'
                    );
                default:
                    return new Error('Debes indicar un nombre de usuario.');
            }
        }),
});

module.exports = { newUserSchema };

//
