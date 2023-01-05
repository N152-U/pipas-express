const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  // eslint-disable-next-line arrow-body-style
  comparePasswords: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
  // eslint-disable-next-line camelcase
  createToken: ({
    id, username, firstName, middleName, lastName, roleId, role, hash
  }) => {
    try {
      const payload = {
        id,
        username,
        firstName,
        middleName,
        lastName,
        roleId,
        role,
        hash
      };
      const options = {
        expiresIn: '2hr',
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  decodeToken:(
    authorization
  )=>
  {
    try{
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     return decoded;
    }catch(error)
    {
      throw new Error(error.message);
    }

  }

};
