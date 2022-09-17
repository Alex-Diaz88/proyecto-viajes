const Joi = require('joi');

const editUserPassword = Joi.object().keys({
    oldPass: Joi.string()
        .required()
        .min(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Introduce la contraseña actual');
                case 'string.min':
                    return new Error(
                        'La contraseña actual necesita un minimo de 5 caracteres.'
                    );
                default:
                    return new Error('Contraseña actual introducida no valida');
            }
        }),
    newPass: Joi.string()
        .required()
        .min(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Introduce una contraseña nueva');
                case 'string.min':
                    return new Error(
                        'La nueva contraseña necesita un minimo de 5 caracteres.'
                    );
                default:
                    return new Error('Nueva contraseña introducida no valida');
            }
        }),
});

module.exports = editUserPassword;
