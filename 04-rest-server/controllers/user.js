const {response} = require('express');
const userGet = (req, res = response) => {
  const query = req.query;

  res.json({
    msg: 'get API'
  });
};

const userPut = (req, res = response) => {
  const {id} = req.params;
  res.json({
    msg: 'put API'
  });
};

const userPost = (req, res = response) => {
  const {name, age} = req.body;
  res.json({
    msg: 'post API',
    body: {
      name,
      age
    }
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: 'delete API'
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
