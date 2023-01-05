const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TripHasFolio = sequelize.define(
    "trips_has_folios",
    {
      parity: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
        field: "parity",
        comment: "Id para relacionar por paridad",
      },
      tripId: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
        field: "trip_id",
        comment: "Llave foranea de la tabla trips",
      },
     
      folio: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
        /*    unique: true, */
        comment: "Primer folio del viaje",
      },
      folioType: {
        type: DataTypes.ENUM,
        field: "folio_type",
        values: ["1", "2"],
        allowNull: false,
        default: "1",
        comment: "Tipo de acción (1: 10000, 2: 20000)",
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      uniqueKeys: {
        folio_unique: {
          fields: ["folio", "folio_type"],
        }
      },
    }
  );

  return TripHasFolio;
};
