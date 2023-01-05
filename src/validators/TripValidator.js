const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    assign: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
               
                driverId: Joi.number().required().messages({
                    "number.base": `"Pipero"   debe ser un`,
                    "number.empty": `"Pipero"  debe contener un valor`,
                    "any.required": `"Pipero" es un campo obligatorio`
                }),
                folio: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Modelo"  debe ser una cadena de caracteres`,
                }),
                folio2: Joi.string().required().max(7).messages({
                    "string.base": `"Placa"   debe ser una cadena de caracteres`,
                    "string.empty": `"Placa"  debe contener un valor`,
                    "any.required": `"Placa" es un campo obligatorio`
                }),
                photo: Joi.string().required().max(3).messages({
                    "string.base": `"Número economico"  debe ser un arreglo`,
                    "string.empty": `"Número economico"  debe contener un valor`,
                    "any.required": `"Número economico" es un campo obligatorio`
                }),
               

            }),

    }),
   
};