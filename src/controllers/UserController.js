const { UserService } = require("../services/index.js");
const auth = require("../utils/auth.js");
const jwt = require("jsonwebtoken");
const APIError = require("../utils/error.js");

module.exports = {
  // CREATE
  signup: async (req, res, next) => {
    try {
      const { body } = req;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("first",body);
      const userCreated = await UserService.signup(decoded.id,body);

      await UserService.registerUserLogByUserID(
        decoded.id,
        userCreated.id,
        1,
        "users",
        userCreated
      );

      res.status(201).json({ message: "User created", payload: userCreated });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },

  //LOGIN
  login: async (req, res, next) => {
    try {
      console.log(req.connection.remoteAddress);
      const { username, password } = req.body;
      const ipLogin = req.connection.remoteAddress;
      const user = await UserService.findOneByUsername(username);

      if (!user) throw new APIError("Error on credentials.", 400);
      if (!user.active) throw new APIError("User Not Active", 400);
      const isValid = auth.comparePasswords(password, user.password);
      if (!isValid) throw new APIError("Error on credentials.", 400);
      await UserService.registerIpAndLastLogin(user.id, ipLogin);
      const token = auth.createToken(user);
      res.status(200).json({ message: "Log in", payload: token });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  // READ ALL BY STATUS TRUE
  getAll: async(req, res, next) => {
    try {
        const {offset, limit,username,firstName,middleName,lastName,roleName}=req.query;  
        const users = await UserService.getAll(offset, limit,username,firstName,middleName,lastName,roleName);
        res.status(200).json({ payload: users });
    } catch (error) {
        (process.env.DEBUG) ? next(console.trace(error)): next(error);
    }
},
getTotalCount: async (req, res, next) => {
  try {
   
    const {offset, limit,username,firstName,middleName,lastName,roleName}=req.query;  
    const usersCount = await UserService.getTotalCount(offset, limit,username,firstName,middleName,lastName,roleName);
    res.json({ payload: usersCount });
  } catch (error) {
    process.env.DEBUG ? next(console.trace(error)) : next(error);
  }
},

  // READ BY ID
  getById: async (req, res, next) => {
    try {
      const { hash } = req.params;
      const user = await UserService.getByHash(hash);
    
    const formattedUser = {
        firstName: user.firstName,
        hash: user.hash,
        lastName: user.lastName,
        middleName: user.middleName,
        roleId: user.roleId,
        hashRole: user.roles.dataValues,
        username: user.username,
    }     
    res.json({ payload: formattedUser });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getDetail: async(req, res, next) => {
    try {
       
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserService.getDetail(decoded.id);
        const formattedUser = {
            firstName: user.firstName,
            hash: user.hash,
            lastName: user.lastName,
            middleName: user.middleName,
            roles: user["roles"].dataValues.role,
            username: user.username,
        }
    
        
        res.json({ payload: formattedUser });
    } catch (error) {
        (process.env.DEBUG) ? next(console.trace(error)): next(error);
    }
},
getByIdDetail: async(req, res, next) => {
  try {
     
      const { hash } = req.params;
      const user = await UserService.getByIdDetail(hash);
      const formattedUser = {
          firstName: user.firstName,
          hash: user.hash,
          lastName: user.lastName,
          middleName: user.middleName,
          roles: user["roles"].dataValues.role,
          username: user.username,
      }
  
      
      res.json({ payload: formattedUser });
  } catch (error) {
      (process.env.DEBUG) ? next(console.trace(error)): next(error);
  }
},
  // UPDATE
  update: async (req, res, next) => {
    try {
      const { hashUser } = req.params;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { hashRole, username, password, firstName, middleName, lastName } =
        req.body;
      const updatedUser = await UserService.update(
        hashUser,
        hashRole,
        username,
        password,
        firstName,
        middleName,
        lastName,
        decoded.id
      );
     
      await UserService.registerUserLogByUserID(
        decoded.id,
        updatedUser.id,
        2,
        "users",
        updatedUser
      );
      res.status(200).json({ message: "User has been updated" });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  updatePassword: async(req, res, next) => {
    try {
        const { hashUser } = req.params;
        const {password} = req.body;
        await UserService.updatePassword(hashUser,password);

        res.status(200).json({ message: 'User has been updated' });
    } catch (error) {
        (process.env.DEBUG) ? next(console.trace(error)): next(error);
    }
},
  // DELETE
  deleteOne: async (req, res, next) => {
    try {
      const { hash } = req.params;
      
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const deletedUser = await UserService.deleteOne(hash);

      await UserService.registerUserLogByUserID(
        decoded.id,
        deletedUser.id,
        3,
        "users",
        deletedUser
      );
      res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },

  // READ ALL USER PERMISSIONS
  getAllPermissionsByHash: async (req, res, next) => {
    try {
      const { hash } = req.params;
      console.log("my_hash",hash)
      if (req.user.hash == hash || req.user.role == "ADMIN") {
        const user = await UserService.findOneByHashWithRolePermissions(
          hash
        );
        
        res.status(200).json({
          payload: { role: user.role, permissions: user.permissions },
        });
      } else {
        throw new APIError("Not Authorized", 403);
      }
    } catch (error) {
      if (process.env.DEBUG) next(console.trace(error));
      next(error.message);
    }
  },

};
