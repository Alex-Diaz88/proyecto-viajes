const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    password: Joi.string()
        .required()
        .min(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error(
                        'Lo sentimos, la password no puede estar vacia..'
                    );
                case 'string.min':
                    return new Error(
                        'Lo sentimos, la password debe tener un minimo de 5 caracteres... '
                    );
                default:
                    return new Error(
                        'Cuidado! El campo password no puede estar vacio'
                    );
            }
        }),
    email: Joi.string()
        .required()
        .email()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error(
                        'la direccion de email no puede estar vacia...'
                    );
                case 'string.email':
                    return new Error('No es un email valido...');

                default:
                    return new Error('El email no es valido');
            }
        }),
    username: Joi.string()
        .required()
        .min(2)
        .max(20)
        .regex(/[A-Za-z0-9]/)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error(
                        'Lo siento, no puedes registrarte sin un nombre.'
                    );
                case 'string.min':
                    return new Error(
                        'Lo sentimos, el nombre debe tener un minimo de 2 caracteres.'
                    );
                case 'string.max':
                    return new Error(
                        'Lo sentimos, Lo sentimos, el nombre no puede tener mas de 20 caracteres.'
                    );
                default:
                    return new Error('EL nombre no es valido');
            }
        }),
});

module.exports = { newUserSchema };
