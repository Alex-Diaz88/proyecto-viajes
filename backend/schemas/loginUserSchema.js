const Joi = require('joi');

const loginUserSchema = Joi.object().keys({
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
                    return new Error('Atento,No has indicado ningun email...');
            }
        }),

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
});

module.exports = loginUserSchema;
