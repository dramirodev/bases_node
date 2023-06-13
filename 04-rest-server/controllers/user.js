const {response} = require('express');

const User = require('../models/user');
const {encryptPassword} = require("../helpers/encrypt");

const userGet = async (req, res = response) => {
  const {limit = 5, from = 0} = req.query;

  const dbQuery = {state: true};

  const [total, users] = await Promise.all([
    User.countDocuments(dbQuery),
    User.find(dbQuery).limit(Number(limit)).skip(Number(from))
  ]);

  res.json({
    pagination: {
      limit,
      from,
      total,
    },
    users
  });
};

const userPut = async (req, res = response) => {
  const {id} = req.params;
  const {_id, password, google, ...rest} = req.body;

  if (password) {
    rest.password = encryptPassword(password);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    user
  });
};

const userPost = async (req, res = response) => {

  const {name, email, password, role} = req.body;

  // Encrypt password
  const passwordHash = encryptPassword(password);

  const {password: pass, ...user} = new User({name, email, password: passwordHash, role});
  await user.save();

  res.json({
    user
  });
};

const userDelete = async (req, res = response) => {
  const {id} = req.params;

  // const user = await User.findByIdAndDelete(id); // This is not recommended because of references will be lost.

  const user = await User.findByIdAndUpdate(id, {state: false});
  res.json({
    msg: 'delete API',
    user
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: 'patch API'
  });
};


module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch
};
