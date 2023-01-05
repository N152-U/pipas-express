const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
               
                brand: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Marca"  debe ser una cadena de caracteres`,
                }),
                model: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Modelo"  debe ser una cadena de caracteres`,
                }),
                placa: Joi.string().required().max(7).messages({
                    "string.base": `"Placa"   debe ser una cadena de caracteres`,
                    "string.empty": `"Placa"  debe contener un valor`,
                    "any.required": `"Placa" es un campo obligatorio`
                }),
                eco: Joi.string().required().max(3).messages({
                    "string.base": `"Número economico"  debe ser un arreglo`,
                    "string.empty": `"Número economico"  debe contener un valor`,
                    "any.required": `"Número economico" es un campo obligatorio`
                }),
                dependencyId: Joi.number().required().messages({
                    "number.base": `"Dependencia"  debe ser numerico`,
                    "number.empty": `"Dependencia"  debe contener un valor`,
                    "any.required": `"Dependencia" es un campo obligatorio`
                }),
                capacityId: Joi.number().required().messages({
                    "number.base": `"Capacidad"  debe ser numerico`,
                    "number.empty": `"Capacidad"  debe contener un valor`,
                    "any.required": `"Capacidad" es un campo obligatorio`
                }),
                firstName: Joi.string().required().messages({
                    "string.base": `"Nombre"  debe ser una cadena de caracteres`,
                    "string.empty": `"Nombre"  debe contener un valor`,
                    "any.required": `"Nombre" es un campo obligatorio`
                }),
                maternalSurname: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Apellido Materno"  debe ser una cadena de caracteres`,
                }),
                paternalSurname: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Apellido Paterno"  debe ser una cadena de caracteres`,
                }),
                phoneNumber: Joi.number().optional().allow(null).allow('').max(9999999999).messages({
                    "number.base": `"Número Telefónico"  debe ser numerico`,
                }),


            }),

    }),
    update: celebrate(
        {
            [Segments.PARAMS]: Joi
            .object()
            .keys({
                id: Joi.number().required().messages({
                    "number.base": `"Id"  debe ser un identificador numerico`,
                }),
              


            }),
        [Segments.BODY]: Joi
            .object()
            .keys({
                
                brand: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Marca"  debe ser una cadena de caracteres`,
                }),
                model: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Modelo"  debe ser una cadena de caracteres`,
                }),
                placa: Joi.string().required().max(7).messages({
                    "string.base": `"Placa"   debe ser una cadena de caracteres`,
                    "string.empty": `"Placa"  debe contener un valor`,
                    "any.required": `"Placa" es un campo obligatorio`
                }),
                eco: Joi.string().required().max(3).messages({
                    "string.base": `"Número economico"  debe ser un arreglo`,
                    "string.empty": `"Número economico"  debe contener un valor`,
                    "any.required": `"Número economico" es un campo obligatorio`
                }),
                dependencyId: Joi.number().required().messages({
                    "number.base": `"Dependencia"  debe ser numerico`,
                    "number.empty": `"Dependencia"  debe contener un valor`,
                    "any.required": `"Dependencia" es un campo obligatorio`
                }),
                capacityId: Joi.number().required().messages({
                    "number.base": `"Capacidad"  debe ser numerico`,
                    "number.empty": `"Capacidad"  debe contener un valor`,
                    "any.required": `"Capacidad" es un campo obligatorio`
                }),
                firstName: Joi.string().required().messages({
                    "string.base": `"Nombre"  debe ser una cadena de caracteres`,
                    "string.empty": `"Nombre"  debe contener un valor`,
                    "any.required": `"Nombre" es un campo obligatorio`
                }),
                maternalSurname: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Apellido Materno"  debe ser una cadena de caracteres`,
                }),
                paternalSurname: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Apellido Paterno"  debe ser una cadena de caracteres`,
                }),
                phoneNumber: Joi.number().optional().allow(null).allow('').max(9999999999).messages({
                    "number.base": `"Número Telefónico"  debe ser numerico`,
                }),


            }),
            

    }),
 
};