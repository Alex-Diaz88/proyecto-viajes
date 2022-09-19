const Joi = require('joi');

const deleteUserSchema = Joi.object().keys({
    password: Joi.string()
        .required()
        //.min(5)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error(
                        'Debes indicar la contraseña para borrar el usuario'
                    );
                default:
                    return new Error('El password no puede estar vacio');
            }
        }),
});

module.exports = deleteUserSchema;
