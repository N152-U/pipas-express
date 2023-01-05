'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('municipalities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      municipality: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nombre del Municipio o Alcaldia',
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Estatus del Municipio o Alcaldia',
      },
     realId: {
       type: Sequelize.INTEGER,
       allowNull: false,
       unique:true,
       field: 'real_id',
     },
     geoShape: {
       type: Sequelize.JSONB,
       allowNull: false,
       field: 'geo_shape',
     },
    },{
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      timestamps: true,
      comment: 'Esta tabla contiene solamente las 16 alcaldías de la ciudad de México, se eliminaron las columnas acronym, created_by y url ya que no eran relevantes para el sistema',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('municipalities');
  },
};
