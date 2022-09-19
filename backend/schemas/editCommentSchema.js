const Joi = require('joi');

const editCommentSchema = Joi.object().keys({
    content: Joi.string()
        .required()
        .max(200)
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Escribe tu comentario.');
                case 'string.max':
                    return new Error(
                        'El comentario no puede tener más de 200 caracteres.'
                    );
                default:
                    return new Error('La descripcion no es valida');
            }
        }),
});

module.exports = editCommentSchema;
