const {
  Collaborator,
  TypeCollaborator,
  CollaboratorSettlement,
  CollaboratorHasSettlement,
  User,
  Settlement,
  tPostgres,
} = require("../models/index.js");

const { Sequelize } = require("sequelize");

let t;
module.exports = {
  create: async (createdBy, body) => {
    try {
      t = await tPostgres();

      body.createdBy = createdBy;
      body.collaboratorTypeId = 1;
      const { settlementsId } = body;
      delete body["settlementsId"];

      const collaboratorCreated = await Collaborator.create(
        {
          ...body,
        },
        {
          transaction: t,
        }
      );

      await t.commit();
      t = await tPostgres();
      await collaboratorCreated.addSettlement(
        settlementsId,
        {
          through: {
            selfGranted: false,
          },
        },
        { transaction: t }
      );

      await t.commit();

      return collaboratorCreated;
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },

  getAll: async () => {
    try {
      const collaborators = await Collaborator.findAll({
        attributes: [
          "id",
          "firstName",
          "paternalSurname",
          "maternalSurname",
          "phoneNumber",
        ],
        where: {active: true},
        include: [
          {
            model: Settlement,
            as: "settlements",
            attributes: ["id", "settlement", "d_tipo_asenta", "municipalityId"],
            where: {
              active: true,
            },
            required: true,
          },
        ],
      });
      return collaborators;
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  getById: async (id) =>
    Collaborator.findByPk(id, {
      attributes: [
        "id",
        "firstName",
        "paternalSurname",
        "maternalSurname",
        "phoneNumber",
      ],
      include: [
        {
          model: Settlement,
          as: "settlements",
          attributes: ["id", "settlement", "d_tipo_asenta", "municipalityId"],
          where: {
            active: true,
          },
          required: true,
        },
      ],
    }),

  update: async (body, id) => {
    try {
      const { settlementsId } = body;
      delete body["settlementsId"];
      t = await tPostgres();
      const collaboratorUpdated = await Collaborator.update(
        body,
        {
          where: {
            id,
          },
        },
        {
          transaction: t,
        }
      );

      const findCollaborator = await Collaborator.findOne({ where: { id } });
      await findCollaborator.setSettlements(settlementsId);

      await t.commit();

      return collaboratorUpdated;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },

  delete: async (id) => {
    try {
      t = await tPostgres();
      const collaboratorDeleted = await Collaborator.update(
        {
          active: false,
        },
        {
          where: {
            id,
          },
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      return collaboratorDeleted;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  getSettlementsByCollaborator: async (id) => {
    try {
      const collaborators = await Collaborator.findOne({
        attributes: [],
        where: {
          id,
        },
        include: [
          {
            model: Settlement,
            as: "settlements",
            attributes: ["id", "settlement"],
            where: {
              active: true,
            },
            required: true,
          },
        ],
      });
      return collaborators;
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
};
