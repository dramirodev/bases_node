const Role = require("../models/role");
const User = require("../models/user");
const validateRole = async (role = '') => {
  const isExist = await Role.findOne({role});
  if (!isExist) {
    throw new Error(`Role: ${role} is not valid`);
  }
};

const emailExists = async (email = '') => {
  const emailExists = await User.findOne({email});
  if (emailExists) {
    throw new Error(`Email: ${email} exists`);
  }
};

const userExists = async (id = '') => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`User with id: ${id} does not exist`);
  }
};

module.exports = {
  validateRole,
  emailExists,
  userExists
};
