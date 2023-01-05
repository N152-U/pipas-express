const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Log = sequelize.define('logs', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    registerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'register_id'
    },
    type: {
      type: DataTypes.ENUM,
     
      values: ['1', '2' ,'3'],
       allowNull: false,
      comment: 'Tipo de acción (1: Creacion, 2: Edicion, 3: Eliminacion)',
    },
    table: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE ,
      allowNull: false,
    
      field: 'created_at'
    }
  }, {
    freezeTableName: true,
    timestamps: true,
/*     createdAt: 'created_at', */
    updatedAt: false
  });
  return Log;
};
