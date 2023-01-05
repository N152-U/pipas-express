const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    signup: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                hash: Joi.string().required().messages({
                    "string.base": `"Role"  debe ser una cadena de caracteres`,
                    "string.empty": `"Role"  debe contener un valor`,
                    "any.required": `"Role" es un campo obligatorio`
                }),
                firstName: Joi.string().required().messages({
                    "string.base": `"Nombre"  debe ser una cadena de caracteres`,
                    "string.empty": `"Nombre"  debe contener un valor`,
                    "any.required": `"Nombre" es un campo obligatorio`
                }),
                middleName: Joi.string().required().messages({
                    "string.base": `"Apellido Materno"  debe ser una cadena de caracteres`,
                    "string.empty": `"Apellido Materno"  debe contener un valor`,
                    "any.required": `"Apellido Materno" es un campo obligatorio`
                }),
                lastName: Joi.string().required().messages({
                    "string.base": `"Apellido Paterno"  debe ser una cadena de caracteres`,
                    "string.empty": `"Apellido Paterno"  debe contener un valor`,
                    "any.required": `"Apellido Paterno" es un campo obligatorio`
                }),
                username: Joi.string().email().required().messages({
                    "string.base": `"Correo"  debe ser una cadena de caracteres`,
                    "string.empty": `"Correo"  debe contener un valor`,
                    "string.email": `"Correo"  debe tener el formato correo@correo.com`,
                    "any.required": `"Correo" es un campo obligatorio`
                }),
                password: Joi.string().required().messages({
                    "string.base": `"Contraseña"  debe ser una cadena de caracteres`,
                    "string.empty": `"Contraseña"  debe contener un valor`,
                    "any.required": `"Contraseña" es un campo obligatorio`
                }),

            }),
    }),
    login: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                username: Joi.string().required().messages({
                    "string.base": `"Correo"  debe ser una cadena de caracteres`,
                    "string.empty": `"Correo"  debe contener un valor`,
                    "any.required": `"Correo" es un campo obligatorio`
                }),
                password: Joi.string().required().messages({
                    "string.base": `"Contraseña"  debe ser una cadena de caracteres`,
                    "string.empty": `"Contraseña"  debe contener un valor`,
                    "any.required": `"Contraseña" es un campo obligatorio`
                }),
            }),
    }),
    update: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                hashRole: Joi.string().required().messages({
                    "string.base": `"Role"  debe ser una cadena de caracteres`,
                    "string.empty": `"Role"  debe contener un valor`,
                    "any.required": `"Role" es un campo obligatorio`
                }),
                firstName: Joi.string().required().messages({
                    "string.base": `"Nombre"  debe ser una cadena de caracteres`,
                    "string.empty": `"Nombre"  debe contener un valor`,
                    "any.required": `"Nombre" es un campo obligatorio`
                }),
                middleName: Joi.string().required().messages({
                    "string.base": `"Apellido Materno"  debe ser una cadena de caracteres`,
                    "string.empty": `"Apellido Materno"  debe contener un valor`,
                    "any.required": `"Apellido Materno" es un campo obligatorio`
                }),
                lastName: Joi.string().required().messages({
                    "string.base": `"Apellido Paterno"  debe ser una cadena de caracteres`,
                    "string.empty": `"Apellido Paterno"  debe contener un valor`,
                    "any.required": `"Apellido Paterno" es un campo obligatorio`
                }),
                username: Joi.string().email().required().messages({
                    "string.base": `"Correo"  debe ser una cadena de caracteres`,
                    "string.empty": `"Correo"  debe contener un valor`,
                    "string.email": `"Correo"  debe tener el formato correo@correo.com`,
                    "any.required": `"Correo" es un campo obligatorio`
                }),
                password: Joi.string().required().messages({
                    "string.base": `"Contraseña"  debe ser una cadena de caracteres`,
                    "string.empty": `"Contraseña"  debe contener un valor`,
                    "any.required": `"Contraseña" es un campo obligatorio`
                }),
            }),
    }),
};