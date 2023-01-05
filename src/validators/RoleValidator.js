const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                roleName: Joi.string().required().min(3).messages({
                    "string.base": `"Role"  debe ser una cadena de caracteres`,
                    "string.min": `"Role"  debe tener al menos 3 caracteres`,
                    "string.empty": `"Role"  debe contener un valor`,
                    "any.required": `"Role" es un campo obligatorio`
                }),
                permissionId: Joi.array().items(Joi.number()).required().messages({
                    "array.base": `"Permisos"  debe ser un arreglo`,
                    "array.empty": `"Permisos"  debe contener un valor`,
                    "any.required": `"Permisos" es un campo obligatorio`
                })
            }),

    }),
    update: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                roleName: Joi.string().required().messages({
                    "string.base": `"Role"  debe ser una cadena de caracteres`,
                    "string.empty": `"Role"  debe contener un valor`,
                    "any.required": `"Role" es un campo obligatorio`
                }),
                permissionId: Joi.object().required().messages({
                    "object.base": `"Permisos"  debe ser un objeto`,
                    "object.empty": `"Permisos"  debe contener un valor`,
                    "any.required": `"Permisos" es un campo obligatorio`
                })
            }),
    }),
};