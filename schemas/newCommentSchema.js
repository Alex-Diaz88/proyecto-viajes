const Joi = require('joi');

const newCommentSchema = Joi.object().keys({
    content: Joi.string()
        .required()
        .min(10)
        .max(200)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('El comentario no puede estar vacio');
                case 'string.max':
                    return new Error(
                        'El comentario no puede tener más de 200 caracteres'
                    );
                case 'string.min':
                    return new Error(
                        'El comentario no puede tener menos de 10 caracteres'
                    );

                default:
                    return new Error(
                        'El campo comentario no puede estar vacio'
                    );
            }
        }),
});

module.exports = { newCommentSchema };
