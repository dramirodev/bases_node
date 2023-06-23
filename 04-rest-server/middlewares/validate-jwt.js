const JWT = require('jsonwebtoken');
const User = require('../models/user');

const validateJwt = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    res.status(401).json({
      msg: 'No se recibió el token'
    });
  }

  try {
    const {uid} = JWT.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(uid);

    if(!user){
      return res.status(401).json({
        msg: 'Usuario no válido'
      });
    }

    if (!user?.state) {
      return res.status(401).json({
        msg: 'token no válido'
      });
    }

    req.uid = uid;
    req.user = user;

    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      msg: 'Token no válido'
    });
  }
};

module.exports = {validateJwt};
