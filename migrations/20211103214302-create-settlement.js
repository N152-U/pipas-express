'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('settlements', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      municipalityId: {
        type: Sequelize.INTEGER,
        field: 'municipality_id',
        allowNull: false,
        comment: 'Llave foranea de la tabla de municipalities',
      },
      zip_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        length: 5,
        comment: 'Codigo Postal',
      },
      settlement: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nombre de la Colonia ',
      },
      d_tipo_asenta: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Tipo de Asentamiento',
      },
      d_mnpio: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Municipio o Alcaldia',
      },
      d_estado: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Estado',
      },
      d_ciudad: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Ciudad',
      },
      d_cp: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Oficina Electoral',
      },
      c_estado: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Clave de Estado',
      },
      c_oficina: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Clave de Oficina',
      },
      c_tipo_asenta: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Clave de Tipo de Asentamiento',
      },
      c_mnpio: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Clave de Municipio o Alcaldia',
      },
      id_asenta_cpcons: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '',
      },
      d_zona: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Tipo de Zona',
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Estatus de la Colonia',
      },
    },{
      freezeTableName: true,
      updatedAt: true,
      timestamps: true,
      comment: 'Esta tabla es una catalogo de Colonias proporcionada por correos de mexico, http://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx',
      indexes: [{
        fields: ['zip_code'],
      }, {
        fields: ['municipalityId'],
      }],
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('settlements');
  },
};