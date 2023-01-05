const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required().messages({
        "string.base": `"Nombre"  debe ser una cadena de caracteres`,
        "string.empty": `"Nombre"  debe contener un valor`,
        "any.required": `"Nombre" es un campo obligatorio`,
      }),
      paternalSurname: Joi.string().optional().allow(null).allow("").messages({
        "string.base": `"Apellido Paterno"   debe ser una cadena de caracteres`,
      }),
      maternalSurname: Joi.string().optional().allow(null).allow("").messages({
        "string.base": `"Apellido Materno"  debe ser una cadena de caracteres`,
      }),

      phoneNumber: Joi.number()
        .required()
        .allow(null)
        .allow("")
        .max(9999999999)
        .messages({
          "number.base": `"Número Telefónico"  debe ser numerico`,
          "any.required": `"Número Telefónico" es un campo obligatorio`,
        }),
        settlementsId: Joi.array().required().messages({
            "array.base": `"Colonias"  debe ser un objeto`,
          }),
    }),
  }),
  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required().messages({
        "number.base": `"Id"  debe ser un identificador numerico`,
      }),
    }),
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required().messages({
        "string.base": `"Nombre"  debe ser una cadena de caracteres`,
        "string.empty": `"Nombre"  debe contener un valor`,
        "any.required": `"Nombre" es un campo obligatorio`,
      }),
      paternalSurname: Joi.string().optional().allow(null).allow("").messages({
        "string.base": `"Apellido Paterno"   debe ser una cadena de caracteres`,
      }),
      maternalSurname: Joi.string().optional().allow(null).allow("").messages({
        "string.base": `"Apellido Materno"  debe ser una cadena de caracteres`,
      }),

      phoneNumber: Joi.number()
        .required()
        .allow(null)
        .allow("")
        .max(9999999999)
        .messages({
          "number.base": `"Número Telefónico"  debe ser numerico`,
          "any.required": `"Número Telefónico" es un campo obligatorio`,
        }),
        settlementsId: Joi.array().required().messages({
            "array.base": `"Colonias"  debe ser un objeto`,
          }),
    }),
  }),
};
