const Joi = require('joi');

const editTravelSchema = Joi.object().keys({
    title: Joi.string()
        .required()
        .min(2)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Introduce un nuevo titulo para tu historia.');
                case 'string.min':
                    return new Error(
                        'El nuevo titulo tiene que tener un minimo de 2 caracteres.'
                    );
                default:
                    return new Error('El nuevo titulo introducido no es valido');
            }
        }),
    entry: Joi.string()
        .required()
        .min(15)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Introduce una nueva entrada a tu historia.');
                case 'string.min':
                    return new Error(
                        'La nueva entrada necesita un minimo de 15 caracteres.'
                    );
                default:
                    return new Error('La nueva entrada no es valida.');
            }
        }),
        content: Joi.string()
        .required()
        .min(20)
        .max(500)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Es obligatoria una descripcion de tu viaje!');
                case 'string.min':
                    return new Error(
                        'La descripcion del viaje ha de tener mas de 20 caracteres.'
                    );
                    case 'string.max':
                        return new Error(
                            'La descripcion del viaje ha de tener menos de 500 caracteres.'
                        );
                default:
                    return new Error('La descripcion no es valida');
            }
        }),
});

module.exports = editTravelSchema;