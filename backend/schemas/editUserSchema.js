const Joi = require('joi');

const editUserSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .error((errors) => {
            switch (errors[0].code) {
                case 'string.email':
                    return new Error('No es un email valido...');

                default:
                    return new Error('El email no es valido');
            }
        }),
    username: Joi.string()
        .min(2)
        .max(20)
        .regex(/[A-Za-z0-9]/)
        .error((errors) => {
            switch (errors[0].code) {
                case 'string.min':
                    return new Error(
                        'Lo sentimos, el nuevo nombre debe tener un minimo de 2 caracteres.'
                    );
                case 'string.max':
                    return new Error(
                        'Lo sentimos, el nuevo nombre no puede tener mas de 20 caracteres.'
                    );
                default:
                    return new Error('EL nuevo nombre no es valido');
            }
        }),
});

module.exports = editUserSchema;
