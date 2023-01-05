/**
 * DependencyService
 * @module src/models/Dependency
 * @name Dependency
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dependency = sequelize.define('dependencies', {
  /**
    * Dependency Model
    * @typedef {Object} module:Dependency.Dependency
    * @property {String} dependency Dependency Name.
    * @property {Boolean} [active=true] Status of Dependency (Optional).
    * @property {number} created_by Created by.
    * @property {number} updated_by Updated by (Optional).
    * @property {Timestamp} [timestamps] Timestamps of Dependency.
    *  Show only when getting  Dependency (Optional).
    */

    /**
      * @type {Dependency}
      */
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Estatus de la dependencia',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'created_by',
      comment: 'Llave foranea de la tabla users',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_by',
      comment: 'Llave foranea de la tabla users',
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
   /*  createdAt: 'created_at',
    updatedAt: 'updated_at', */
  });

  return Dependency;
};
