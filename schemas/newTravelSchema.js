const Joi = require('joi');

const newTravelSchema = Joi.object().keys({
    title: Joi.string()
        .required()
        .min(3)
        .max(30)
        .regex(/[A-Za-z0-9]/)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('El título es un campo obligatorio.');
            }

            return new Error(
                'El título del viaje debe tener entre 3 y 30 caracteres'
            );
        }),

    entry: Joi.string()
        .required()
        .min(10)
        .max(100)
        .regex(/[A-Za-z0-9]/)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('La entradilla es un campo obligatorio.');
            }

            return new Error(
                'La entradilla del viaje debe tener entre 10 y 100 caracteres'
            );
        }),

    content: Joi.string()
        .min(50)
        .max(500)
        .regex(/[A-Za-z0-9]/)
        .error((_) => {
            return new Error(
                'La descripcion debe tener entre 50 y 500 caracteres'
            );
        }),
});

module.exports = newTravelSchema;
