const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CollaboratorHasSettlement = sequelize.define('collaborators_has_settlements', {
    collaboratorId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        field: 'collaborator_id',
        comment: 'Llave foranea de la tabla permissions',
      },
    settlementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        field: 'settlement_id',
        comment: 'Llave foranea de la tabla de setllements',
      },
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false
    
  });

  return CollaboratorHasSettlement;
};
