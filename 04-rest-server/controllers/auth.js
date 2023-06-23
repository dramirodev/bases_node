const {response} = require('express');
const bcrypt = require('bcryptjs');


const {User} = require('../models');
const generateJWT = require("../helpers/generate-jwt");
const login = async (req, res = response) => {
  const {email, password} = req.body;
  try {
    // Verificar si el email existe
    const user = await User.findOne({email});

    // Si el usuario está activo
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario o Password no es válido - email'
      });
    }

    if (!user.active) {
      return res.status(400).json({
        msg: 'Usuario o Password no es válido - status: false'
      });
    }
    // Check password

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario o Password no es válido - password'
      });
    }

    // generate token

    const token = await generateJWT(user.id);

    res.json({
      msg: 'login OK',
      user,
      token
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(
        {
          msg: 'Algo salió mal - hable con el administrador',
          e
        }
    );
  }

};

module.exports = {
  login
};
