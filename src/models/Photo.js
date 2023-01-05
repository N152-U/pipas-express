/**
 * PhotoModel
 * @module src/models/Photo
 * @name Photo
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
 const { DataTypes } = require("sequelize");

 module.exports = (sequelize) => {
     const Photo = sequelize.define(
         "photos", {
             tripId: {
                 field: "trip_id",
                 allowNull: false,
                 type: DataTypes.INTEGER,
                 comment: "Viaje asociada a la foto",
             },
             data: {
                 type: DataTypes.BLOB,
                 comment: "Diagrama la valvula",
 
             },
             fileName: {
                 type: DataTypes.STRING,
                 field: "file_name",
                 allowNull: false,
                 comment: "Nombre del archivo",
             },
             fileType: {
                 type: DataTypes.STRING,
                 allowNull: false,
                 field: "file_type",
                 comment: "Tipo de archivo",
             },
             status: {
                 type: DataTypes.BOOLEAN,
                 allowNull: false,
                 defaultValue: true,
                 comment: "Estatus del vale de la foto",
             },
             createdBy: {
                 type: DataTypes.INTEGER,
                 allowNull: false,
                 field: "created_by",
                 comment: "Llave foranea de la tabla users",
             },
             updatedBy: {
                 type: DataTypes.INTEGER,
                 allowNull: true,
                 field: "updated_by",
                 comment: "Llave foranea de la tabla users",
             },
             createdAt: {
                type: DataTypes.DATE ,
                allowNull: false,
              
                field: 'created_at'
              },
              updatedAt: {
                type: DataTypes.DATE ,
                allowNull: false,
              
                field: 'updated_at'
              },
         }, {
             freezeTableName: true,
             timestamps: true,
         /*     createdAt: "created_at",
             updatedAt: "updated_at", */
         }
     );
 
     return Photo;
 };