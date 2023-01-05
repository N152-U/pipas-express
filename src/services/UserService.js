const {
  User,
  Role,
  Permission,
  Log,
  tPostgres,
} = require("../models/index.js");
const { Sequelize } = require("sequelize");
const { gt, lte, ne, in: opIn, notLike } = Sequelize.Op;
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

let t;
module.exports = {
  signup: async (createdBy, body) => {
    try {
      t = await tPostgres();
      let date = new Date(new Date() - 3600 * 1000 * 6).toISOString();
      const role = await Role.findOne(
        {
          attributes: ["id"],
          where: {
            hash: body.hash,
          },
        },
        { transaction: t }
      );

      delete body["hash"];
      body.createdBy = createdBy;
      body.created_at = date;
      body.updated_at = date;
      const data = Object.assign({ roleId: role.id }, body, { hash: uuidv4() });

      const userCreated = await User.create(data, { transaction: t });

      await t.commit();
      return userCreated;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
        const errorMessage = error.original.detail;
      throw new Error(errorMessage);
    }
  },
  getDetail: (id) => User.findOne({
    attributes: [ ["role_id","roleId"],"username", ["first_name","firstName"], ["middle_name","middleName"], ["last_name","lastName"],"hash"],
    where: { id },
    include: [{
        model: Role,
        as: "roles",
        attributes: ["role","hash","active"],
        where: { active: true },
        required: true,
    }]

}).then((data) => {
    return data;
}),

  findOneByUsername: (username) =>
    User.findOne({
      attributes: [
        "id",
        "username",
        "password",
        ["first_name", "firstName"],
        ["middle_name", "middleName"],
        ["last_name", "lastName"],
        "active",
        "hash"
      ],

      where: { username },
    }).then((data) => {
      return data;
    }),
    findOneByHashWithRolePermissions: (hash) =>
    User.findOne({
      attributes: [
        "id",
        "username",
        "password",
        ["first_name", "firstName"],
        ["middle_name", "middleName"],
        ["last_name", "lastName"],
        "active",
      ],
      where: { hash },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["role"],
          where: { active: true },
          required: true,
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["permission"],
              where: { active: true },
              required: true,
            },
          ],
        },
      ],
    }).then((data) => {
      data.permissions = data.roles.permissions.map((permission) => {
        return permission.dataValues.permission;
      });
      data.role = data.roles.role;
      return data;
    }),

 
    getAll: (offset, limit,username,firstName,middleName,lastName,roleName) => {
      whereUser = { active: true,
          username: {
              [notLike]: 'admin'
            } };
      if (username) {
          whereUser.username = {
          [Op.iLike]: `%${username}%`,
        };
      }
      if (firstName) {
          whereUser.firstName = {
          [Op.iLike]: `%${firstName}%`,
        };
      }
      if (middleName) {
          whereUser.middleName = {
          [Op.iLike]: `%${middleName}%`,
        };
      }
      if (lastName) {
          whereUser.lastName = {
          [Op.iLike]: `%${lastName}%`,
        };
      }
      whereRoleName = { active: true };
      if (roleName) {
          whereRoleName.role = {
          [Op.iLike]: `%${roleName}%`,
        };
      }
  
      return User.findAll({
          where: whereUser,
              include: [{
                  model: Role,
                  as: "roles",
                  attributes: ["role"],
                  where: whereRoleName,
                  required: true,
              }],
              offset: offset,
              limit: limit,
      }).then((data) => {
        return data;
      });
    },
    getTotalCount: (offset, limit,username,firstName,middleName,lastName,roleName) => {
      whereUser = { active: true,
          username: {
              [notLike]: 'admin'
            } };
      if (username) {
          whereUser.username = {
          [Op.iLike]: `%${username}%`,
        };
      }
      if (firstName) {
          whereUser.firstName = {
          [Op.iLike]: `%${firstName}%`,
        };
      }
      if (middleName) {
          whereUser.middleName = {
          [Op.iLike]: `%${middleName}%`,
        };
      }
      if (lastName) {
          whereUser.lastName = {
          [Op.iLike]: `%${lastName}%`,
        };
      }
      whereRoleName = { active: true };
      if (roleName) {
          whereRoleName.role = {
          [Op.iLike]: `%${roleName}%`,
        };
      }
  
      return User.count({
          where: whereUser,
              include: [{
                  model: Role,
                  as: "roles",
                  attributes: ["role"],
                  where: whereRoleName,
                  required: true,
              }],
              offset: offset,
              limit: limit,
      }).then((data) => {
        return data;
      });
    },
  getByHash: (hash) =>
    User.findOne({
      attributes: [
        ["role_id", "roleId"],
        "username",
        ["first_name", "firstName"],
        ["middle_name", "middleName"],
        ["last_name", "lastName"],
        "hash",
      ],
      where: { hash: hash },
      include: [
      {  model: Role,
        as: "roles",
        attributes: ["role","hash","active"],
        where: { active: true },
        required: true,}
      ],
      
    }).then((data) => {
      
  
      return data;
    }),
    getDetail: (id) => User.findOne({
      attributes: [ ["role_id","roleId"],"username", ["first_name","firstName"], ["middle_name","middleName"], ["last_name","lastName"],"hash"],
      where: { id },
      include: [{
          model: Role,
          as: "roles",
          attributes: ["role","hash","active"],
          where: { active: true },
          required: true,
      }]

  }).then((data) => {
      return data;
  }),
  getByIdDetail: (hash) => User.findOne({
    attributes: [ ["role_id","roleId"],"username", ["first_name","firstName"], ["middle_name","middleName"], ["last_name","lastName"],"hash"],
    where: { hash:hash },
    include: [{
        model: Role,
        as: "roles",
        attributes: ["role","hash","active"],
        where: { active: true },
        required: true,
    }]

}).then((data) => {
    return data;
}),
  update: async (
    hashUser,
    hashRole,
    username,
    password,
    firstName,
    middleName,
    lastName,
    updatedBy
  ) => {
    try {
      t = await tPostgres();
      const userUpdate = await User.findOne({
        where: { hash: hashUser },
      });
      const role = await Role.findOne(
        {
          attributes: ["id"],
          where: {
            hash: hashRole,
          },
        },
        { transaction: t }
      );
      const roleId = role.id;
       await User.update(
        { roleId, username, password, firstName, middleName, lastName,updatedBy },
        { where: { hash: hashUser } },
        { transaction: t }
      );
      await t.commit();
      return userUpdate;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  updatePassword: async(hashUser, password) => {
    try {
        t = await tPostgres();
       
        const userUpdate =
        User.update({ password}, { where: { hash: hashUser } }, { transaction: t });
        await t.commit();
        return userUpdate;

    } catch (error) {
        await t.rollback();
        const reducer = (acc, ValidationErrorItem) => `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
        const errorMessage = error.errors.reduce(reducer, 'Errors: \n');
        throw new Error(errorMessage);
    }
},
  deleteOne: async (hash) => {
    try {
      t = await tPostgres();
      const userDeleted = await User.findOne({
        where: { hash },
      });
       await User.update(
        { active: false },
        { where: { hash } },
        { transaction: t }
      );
      await t.commit();
      return userDeleted;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  registerUserLogByUserID: async (userId, registerId, type, table, data) => {
    try {
      t = await tPostgres();
      Log.create({
        userId,
        registerId,
        type,
        table,
        data,
        created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
      }),
        await t.commit();
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
/*   getIdByUsername: (username) =>
    User.findOne({
      attributes: ["id"],
      where: { username },
    }).then((data) => {
      return data;
    }), */
  registerIpAndLastLogin: async (id, ipLogin) => {
    try {
      t = await tPostgres();

      let date = new Date(new Date() - 3600 * 1000 * 6).toISOString();
      await User.update(
        { ipLogin: ipLogin, lastLogin: date },
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
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
};
